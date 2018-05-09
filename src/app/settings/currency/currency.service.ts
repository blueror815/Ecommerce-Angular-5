import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {CurrencyCode} from './currency-code';
import {Currency} from './currency';
import {RatesTable} from './rates-table';
import {CookieService} from '../../services/cookie.service';

@Injectable()
export class CurrencyService {
  /**
   * Currency cookie key.
   * @type {string}
   */
  private readonly currencyKey = 'currency';

  /**
   * Actual currency rates table (is updated once a day).
   */
  private ratesTable: RatesTable;

  /**
   * Currency subject. Use for emitting change currency events.
   * @type {BehaviorSubject<{code: CurrencyCode; rate: number}>}
   */
  private currencySubject: BehaviorSubject<Currency> =
    new BehaviorSubject({ code: CurrencyCode.JPY, rate: 1 });

  constructor(
    private http: HttpClient,
  ) {
    this.initCurrency();
  }

  /**
   * Initializes current currency.
   */
  private initCurrency(): void {
    this.getRatesTable().subscribe(
      table => {
        this.ratesTable = table;
        const codeCookie = CookieService.getCookie(this.currencyKey);
        const code = codeCookie && codeCookie.toUpperCase() as CurrencyCode;
        if (code && code !== CurrencyCode.JPY) {
          const currency: Currency = {
            code: code,
            rate: this.ratesTable[code],
          };
          this.currencySubject.next(currency);
        }
      },
    );
  }

  /**
   * Gets actual currency rates table from back-end.
   * @return {Observable<RatesTable>}
   */
  private getRatesTable(): Observable<RatesTable> {
    return this.http.get<RatesTable>('/currency-rates');
  }

  /**
   * Gets currency currency.
   * @return {Observable<Currency>}
   */
  public get currency$(): Observable<Currency> {
    return this.currencySubject.asObservable();
  }

  /**
   * Updates currency.
   * @param {CurrencyCode} newCode new currency code
   */
  set currencyCode(newCode: CurrencyCode) {
    // updating currency cookie
    CookieService.changeCookie(this.currencyKey, newCode.toLowerCase());
    // updating currency
    const currency: Currency = {
      code: newCode,
      rate: this.ratesTable[newCode] || 1,
    };
    this.currencySubject.next(currency);
  }

}
