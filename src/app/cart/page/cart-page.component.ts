import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

import {CartItem} from '../../interfaces/cart-item';
import {CartService} from '../../services/cart.service';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';

/**
 * Cart page component class.
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart-page.template.html',
})
export class CartPageComponent implements OnInit, OnDestroy {
  /**
   * Target cart items.
   */
  items: CartItem[];

  // "Pending" flag
  isPending: boolean;

  /**
   * Cart items service subscription.
   */
  private itemsSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private cartService: CartService,
    private i18n: I18nService,
    private title: Title,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
        this.setTitle();
      },
    );

    this.setTitle();

    this.isPending = true;
    this.itemsSub = this.cartService.items$.subscribe(
      items => {
        this.isPending = false;
        this.items = items;
      },
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * Sets current page title.
   */
  private setTitle () {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.cart.shoppingCart}`
    );
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.itemsSub.unsubscribe();
  }
}
