import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {CurrencyCode} from '../currency-code';

import {CurrencyService} from '../currency.service';
import {I18nService} from '../../../i18n/i18n.service';
import {Messages} from '../../../i18n/messages/messages';

/**
 * Select currency component.
 */
@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.template.html',
  styleUrls: ['../../select.styles.css'],
})
export class SelectCurrencyComponent implements OnInit, OnDestroy {
  /**
   * List of available currencies.
   */
  public readonly currencies = Object.values(CurrencyCode);

  /**
   * Current currency.
   */
  public currency: CurrencyCode;

  /**
   * Current currency service subscription.
   */
  private currencySub: Subscription;

  // I18N
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private i18n: I18nService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => this.messages = t.messages,
    );
    this.currencySub = this.currencyService.currency$.subscribe(
      currency => this.currency = currency.code,
    );
  }

  /**
   * Currency dropdown list onChange event emitter.
   */
  public changeCurrency(): void {
    this.currencyService.currencyCode = this.currency;
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

}
