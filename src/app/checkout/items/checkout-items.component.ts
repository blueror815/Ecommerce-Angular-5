import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {CartItem} from '../../interfaces/cart-item';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Currency} from '../../settings/currency/currency';
import {Category} from '../../interfaces/category';

/**
 * Checkout items component class
 */
@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.template.html',
  styleUrls: [
    './checkout-items.styles.css',
    '../../styles/img-square.css',
  ],
})
export class CheckoutItemsComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Target order cart items.
   */
  @Input() items: CartItem[];

  /**
   * Current currency.
   */
  @Input() currency: Currency;

  /**
   * Total cost of the order items.
   * @type {number}
   */
  total = 0;

  // I18N
  messages: Messages = this.i18n.defaultTranslations.messages;
  categories: Category[] = this.i18n.defaultTranslations.categories;
  private tSub: Subscription;

  constructor(private i18n: I18nService) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.messages = t.messages;
        this.categories = t.categories;
      },
    );
  }

  /**
   * Gets category name due to current locale.
   * @param {number} id category ID
   * @return {string}
   */
  getCategory(id: number): string {
    const category = this.categories.find(x => x.id === id);
    if (category) {
      return `${category.name}: `;
    } else {
      return `${id}: `;
    }
  }

  /**
   * Calculates a price due to the currency rate.
   * @param {number} price
   * @return {number}
   */
  getPrice(price: number) {
    return Math.ceil(price * this.currency.rate);
  }

  ngOnChanges() {
    this.total = 0;
    if (this.items) {
      this.items.map(item => {
        this.total += item.quantity * Math.ceil(item.product.price * this.currency.rate);
      });
    }
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
