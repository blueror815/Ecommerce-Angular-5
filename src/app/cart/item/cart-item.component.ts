import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CartItem} from '../../interfaces/cart-item';
import {CartService} from '../../services/cart.service';
import {I18nService} from '../../i18n/i18n.service';
import {Locale} from '../../i18n/locale';
import {Subscription} from 'rxjs/Subscription';
import {Category} from '../../interfaces/category';

declare const jQuery: any;

/**
 * Cart item component class.
 */
@Component({
  selector: 'app-cart-item',
  templateUrl: 'cart-item.template.html',
  styleUrls: ['../../styles/img-square.css'],
})
export class CartItemComponent implements OnInit, OnDestroy {
  /**
   * Target cart item.
   */
  @Input() item: CartItem;

  // I18N
  categories: Category[] = this.i18n.defaultTranslations.categories;
  locale: Locale = this.i18n.defaultTranslations.locale;
  private tSub: Subscription;

  constructor(
    private cartService: CartService,
    private i18n: I18nService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.categories = t.categories;
        this.locale = t.locale;
      },
    );
  }

  /**
   * "+" button onClick event handler.
   */
  increment(): void {
    this.changeQuantity(this.item.quantity + 1);
  }

  /**
   * "-" button onClick event handler.
   */
  decrement(): void {
    if (this.item.quantity >= 2) {
      this.changeQuantity(this.item.quantity - 1);
    }
  }

  /**
   * Quantity input field onBlur event handler.
   * @param $event
   */
  onBlur($event): void {
    const value = +$event.target.value;
    const oldQuantity = this.item.quantity;
    if (Number.isInteger(value) && value >= 1) {
      this.changeQuantity(value);
    } else {
      $event.target.value = oldQuantity;
    }
  }

  /**
   * "x" button onClick event handler.
   */
  removeItem(): void {
    try {
      this.cartService.removeItem(this.item);
    } catch (err) {
      this.handleError();
    }
  }

  /**
   * Updates the cart item quantity.
   * @param {number} quantity
   */
  private changeQuantity(quantity: number) {
    try {
      this.cartService.changeItemQuantity(this.item, quantity);
    } catch (err) {
      this.handleError();
    }
  }

  /**
   * Error handler.
   */
  private handleError() {
    const modal = jQuery('#cartModal');
    modal.removeClass('fade');
    modal.modal('hide');
    this.router.navigate([`/${this.locale}/error`]).then(() => {
      modal.addClass('fade');
    });
  }

  /**
   * Returns category name due to current locale.
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

  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
