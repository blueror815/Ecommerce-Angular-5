import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';

import {UserData} from '../interfaces/user-data';
import {NoConnectionException} from '../errors/no-connection.exception';
import {FatalError} from '../errors/fatal-error';
import {TokenService} from './token.service';
import {AbstractError} from '../errors/abstract-error';

/**
 * Authorization service class.
 */
@Injectable()
export class AuthService {
  /**
   * Retrieves UserData for current token.
   *
   * @return {Observable<UserData>} when the user is authenticated
   * @return {Observable<null>} when the user is not authenticated
   */
  userData$: Observable<UserData>;

  /**
   * User data subject. Used for signIn and signOut events.
   * @type {Subject<UserData>}
   */
  private userDataSubject: Subject<UserData> = new Subject();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.userData$ = this.userDataFactory();
  }

  /**
   * Initializes `userData$`, concatenating
   * into it `verifyToken` and `userDataSubject` as Observable.
   * @return {Observable<UserData>}
   */
  private userDataFactory(): Observable<UserData> {
    return Observable.concat(
      this.verifyToken(),
      this.userDataSubject.asObservable(),
    ).shareReplay(1);
  }

  /**
   * Returns user data for stored token.
   * If no token is available, null is returned.
   * @return {Observable<UserData>}
   * @return {Observable<null>}
   */
  private verifyToken(): Observable<UserData> {
    const token = this.tokenService.getToken();
    if (token) {
      return this._verifyToken();
    } else {
      return Observable.of(null);
    }
  }

  /**
   * Retrieves user data for stored auth token.
   * @return {Observable<UserData>}
   * @private
   */
  private _verifyToken(): Observable<UserData> {
    return this.http.get('/verify-token')
      .map((res: any) => {
        console.log('User data:', res.userData);
        return res.userData;
      })
      .catch((err: AbstractError) => {
        this.tokenService.removeToken();
        return null;
      });
  }

  /**
   * Performs signIn request to back-end.
   *
   * @param {string} email
   * @param {string} password
   *
   * @return {Observable<boolean>}
   *
   * @throws {NoConnectionException} when there is no HTTP connection
   * @throws {TimeoutException} when timeout 10s exceeded
   * @throws {FatalError} when an error occurs
   */
  public signIn(email: string, password: string): Observable<boolean> {
    return this.http.post('/sign-in', { email, password })
      .map((res: any) => {
        this.authenticate(
          res.token,
          res.userData.email,
          res.userData.fullName,
        );
        return true;
      })
      .catch((err: AbstractError) => {
        this.signOut();
        return Observable.of(false);
      });
  }

  /**
   * Performs singUp request to back-end.
   *
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @return {Observable<any>}
   */
  public signUp(fullName: string, email: string, password: string): Observable<void> {
    return this.http.post('/sign-up', { fullName, email, password })
      .map((res: any) => {
        this.authenticate(
          res.token,
          res.userData.email,
          res.userData.fullName,
        );
      });
  }

  /**
   * Internally authenticates the user.
   *
   * @param {string} token
   * @param {string} email
   * @param {string} fullName
   */
  private authenticate(token: string, email: string, fullName: string): void {
    this.tokenService.setToken(token);
    const userData: UserData = { email, fullName };
    this.userDataSubject.next(userData);
  }

  /**
   * Signs the user out.
   */
  public signOut(): void {
    this.tokenService.removeToken();
    this.userDataSubject.next(null);
  }

  /**
   * Performs password reset request to back-end.
   * @param {string} email
   * @return {Observable<any>}
   */
  public resetPassword(email: string): Observable<void> {
    return this.http.post<void>('/password-reset', { email });
  }

}
