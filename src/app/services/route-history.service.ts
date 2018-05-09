import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';

/**
 * Route history service class.
 * Used for registering current and previous routes and search keywords.
 */
@Injectable()
export class RouteHistoryService {

  private keywordsSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  private pathSubject: ReplaySubject<string> = new ReplaySubject(2);

  constructor() {
    this.pathSubject.next(null);
  }

  /**
   * Gets last search keywords.
   * @return {Observable<string>}
   */
  get keywords$(): Observable<string> {
    return this.keywordsSubject.asObservable();
  }

  /**
   * Registers new search keywords.
   * @param {string} value new search keywords value
   */
  set keywords(value: string) {
    this.keywordsSubject.next(value);
  }

  /**
   * Returns previous route.
   * @return {Observable<string>}
   */
  get previousPath$(): Observable<string> {
    return this.pathSubject.first();
  }

  /**
   * Returns current route.
   * @return {Observable<string>}
   */
  get currentPath$(): Observable<string> {
    return this.pathSubject.take(2);
  }

  /**
   * Registers current route.
   * @param {string} value current route value
   */
  set currentPath(value: string) {
    this.pathSubject.next(value);
  }
}
