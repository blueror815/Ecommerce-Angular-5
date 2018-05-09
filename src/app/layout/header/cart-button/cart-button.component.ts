import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {CartService} from '../../../services/cart.service';
import {UtilsService} from '../../../services/utils.service';
import {I18nService} from '../../../i18n/i18n.service';
import {Messages} from '../../../i18n/messages/messages';

/**
 * Header cart button component.
 */
@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.template.html',
})
export class CartButtonComponent implements OnInit, OnDestroy {
  /**
   * Total number of items in cart.
   */
  totalQuantity: number;

  /**
   * Cart items service subscription.
   */
  private sub: Subscription;

  // I18N
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private cartService: CartService,
    private i18n: I18nService,
    private utils: UtilsService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => this.messages = t.messages,
    );
    this.sub = this.cartService.items$.subscribe(
      items => {
        this.totalQuantity = 0;
        items.map(x => this.totalQuantity += x.quantity);
      },
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
