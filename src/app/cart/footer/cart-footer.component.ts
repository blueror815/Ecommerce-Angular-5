import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {CartItem} from '../../interfaces/cart-item';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';
import {Currency} from '../../settings/currency/currency';
import {CurrencyCode} from '../../settings/currency/currency-code';
import {CurrencyService} from '../../settings/currency/currency.service';

declare const jQuery: any;

/**
 * Cart footer component class.
 */
@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.template.html',
})
export class CartFooterComponent implements OnInit, OnDestroy {
  /**
   * Target cart items.
   */
  @Input() items: CartItem[];

  /**
   * Whether the app should redirect to homepage on "Continue shopping" button click.
   * @type {boolean}
   */
  @Input() homepageRedirect = false;

  // current currency
  currency: Currency = { code: CurrencyCode.JPY, rate: 1 };
  private currencySub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private currencyService: CurrencyService,
    private i18n: I18nService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
      },
    );
    this.currencySub = this.currencyService.currency$.subscribe(
      currency => this.currency = currency,
    );
  }

  // "Continue shopping" button onClick event handler.
  onContinueShopping() {
    if (this.homepageRedirect) {
      this.router.navigate([`/${this.locale}`]);
    }
  }

  /**
   * Gets total cost of the cart items.
   * @return {number}
   */
  get total(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.quantity * Math.ceil(item.product.price * this.currency.rate);
    }
    return total;
  }

  /**
   * "Checkout" button onClick event handler.
   */
  checkout() {
    jQuery('#cartModal').removeClass('fade').modal('hide');
    this.router.navigate([`/${this.locale}/checkout`]);
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.currencySub && this.currencySub.unsubscribe();
  }
}
