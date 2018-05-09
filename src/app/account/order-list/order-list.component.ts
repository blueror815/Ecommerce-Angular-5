import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../../services/auth.service';
import {UserData} from '../../interfaces/user-data';
import {AuthChecker} from '../../helpers/auth-checker';
import {Order} from '../../interfaces/order';
import {OrderService} from '../../services/order.service';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Title} from '@angular/platform-browser';
import {Locale} from '../../i18n/locale';

/**
 * Order list component class.
 */
@Component({
  templateUrl: './order-list.template.html',
})
export class OrderListComponent implements OnInit, OnDestroy {

  /**
   * Orders owner's user data.
   */
  userData: UserData;

  /**
   * Displayed orders.
   * @type {Array}
   */
  orders: Order[] = [];

  /**
   * All orders.
   * @type {Array}
   */
  allOrders: Order[];

  // "Show more" feature vars.
  private orderPacks = 0;
  private readonly ordersByPack = 10;
  isAllShown = false;

  // Authorization checking
  authChecker: AuthChecker;
  private sub1: Subscription;
  private sub2: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private accountService: OrderService,
    private authService: AuthService,
    private i18n: I18nService,
    private router: Router,
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

    this.authChecker = new AuthChecker(this.authService);

    this.sub1 = this.authChecker.onAuthenticated.mergeMap(userData => {
      this.userData = userData;
      return this.accountService.getUserOrders();
    }).subscribe(
      orders => {
        this.allOrders = orders;
        this.displayOrders();
      },
      this.utils.handleComponentError.bind(this.utils),
    );

    this.sub2 = this.authChecker.onNotAuthenticated.subscribe(
      () => this.router.navigate([`/${this.locale}/auth/sign-in`]),
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * Displays orders with "show more" feature.
   */
  displayOrders() {
    for (let i = 0; i < this.ordersByPack; i++) {
      const nextIndex = this.orderPacks * this.ordersByPack + i;
      const nextOrder = this.allOrders[nextIndex];
      if (nextOrder) {
        this.orders.push(this.allOrders[nextIndex]);
      } else {
        this.isAllShown = true;
        break;
      }
    }
    this.orderPacks++;
  }

  /**
   * Sets current page title.
   */
  private setTitle() {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.account.myAccount}`
    );
  }

  /**
   * Calculates order total cost.
   * @param {Order} order target order
   * @return {number}
   */
  getTotal(order: Order) {
    let total = 0;
    order.items.map(item => {
      const rate = order.currency.rate;
      total += item.quantity * Math.ceil(item.product.price * rate);
    });
    return total;
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.authChecker.unsubscribe();
  }
}
