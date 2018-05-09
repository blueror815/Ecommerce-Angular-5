import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/shareReplay';

import {AuthService} from '../services/auth.service';
import {UserData} from '../interfaces/user-data';

/**
 * Authorization pending helper class.
 */
export class AuthChecker {
  /**
   * Authorization "pending" flag
   */
  public pending = false;

  /**
   * Auth service subscription
   */
  private subscription: Subscription;

  // onAuthenticated & onNotAuthenticated subjects
  private onAuthSubject: ReplaySubject<UserData> = new ReplaySubject(1);
  private onNotAuthSubject: ReplaySubject<null> = new ReplaySubject(1);

  /**
   * On-user-authenticated event.
   * @type {Observable<UserData>}
   */
  public onAuthenticated: Observable<UserData> = this.onAuthSubject.asObservable();
  /**
   * On-user-not-authenticated event.
   * @type {Observable<null>}
   */
  public onNotAuthenticated: Observable<null> = this.onNotAuthSubject.asObservable();

  constructor(private authService: AuthService) {
    this.pending = true;
    this.subscription = this.authService.userData$.subscribe(
      userData => {
        if (userData) {
          // authenticated
          this.onAuthSubject.next(userData);
        } else {
          // not authenticated
          this.onNotAuthSubject.next(null);
        }
        this.pending = false;
      },
      err => {},
    );
  }

  /**
   * MANDATORY USE IN ngOnDestroy() OF TARGET CLASS
   */
  public unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
