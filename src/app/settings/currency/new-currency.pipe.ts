import {Pipe, PipeTransform} from '@angular/core';

import {Currency} from './currency';
import {CurrencyCode} from './currency-code';
import {CurrencyService} from './currency.service';
import {I18nService} from '../../i18n/i18n.service';

/**
 * A pipe for representing prices due to current currency and locale.
 */
@Pipe({
  name: 'newCurrency',
  pure: false,
})
export class NewCurrencyPipe implements PipeTransform {
  /**
   * Current currency.
   * @type {{code: CurrencyCode; rate: number}}
   */
  private currency: Currency = { code: CurrencyCode.JPY, rate: 1 };

  /**
   * Current locale.
   * @type {Locale}
   */
  private locale = this.i18n.defaultTranslations.locale;

  constructor(
    private currencyService: CurrencyService,
    private i18n: I18nService,
  ) {
    this.currencyService.currency$.subscribe(
      currency => this.currency = currency,
    );
    this.i18n.translations$.subscribe(
      t => this.locale = t.locale,
    );
  }

  /**
   * @inheritDoc
   * @param {number} priceInJpy price in yens
   * @param {boolean} countRate whether the pipe should count currency rate
   * @param {CurrencyCode} code whether currency code should be displayed
   * @return {string}
   */
  transform(priceInJpy: number, countRate = true, code?: CurrencyCode): string {
    let price: number;
    if (countRate) {
      price = Math.ceil(priceInJpy * this.currency.rate);
    } else {
      price = priceInJpy;
    }
    return price.toLocaleString(this.locale, {
      style: 'currency',
      currency: code || this.currency.code,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}
