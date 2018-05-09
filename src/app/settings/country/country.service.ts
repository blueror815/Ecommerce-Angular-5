import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {CookieService} from '../../services/cookie.service';

/**
 * Country service class.
 */
@Injectable()
export class CountryService {
  /**
   * Default country code (if any). Retrieved from cookies.
   * @type {string}
   */
  private defaultCountryCode: string = CookieService.getCookie('country');

  /**
   * Country subject. Used for emitting country change events.
   * @type {BehaviorSubject<string>}
   */
  private countrySubject: BehaviorSubject<string> =
    new BehaviorSubject(this.defaultCountryCode);

  /**
   * Synchronous snapshot of current country code.
   * @type {string}
   */
  countryCodeSnapshot: string = this.defaultCountryCode;

  /**
   * Gets current country code (async).
   * @return {Observable<string>}
   */
  get countryCode$(): Observable<string> {
    return this.countrySubject.asObservable();
  }

  /**
   * Updates country code.
   * @param {string} code new country code
   */
  set countryCode(code: string) {
    this.countryCodeSnapshot = code;
    CookieService.changeCookie('country', code);
    this.countrySubject.next(code);
  }

}
