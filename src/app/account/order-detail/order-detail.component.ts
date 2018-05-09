import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../../services/auth.service';
import {UserData} from '../../interfaces/user-data';
import {AuthChecker} from '../../helpers/auth-checker';
import {Country} from '../../interfaces/country';
import {Order} from '../../interfaces/order';
import {OrderService} from '../../services/order.service';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';
import {CartItem} from '../../interfaces/cart-item';
import {Category} from '../../interfaces/category';

/**
 * Order detail component class.
 */
@Component({
  templateUrl: './order-detail.template.html',
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  /**
   * Target order.
   */
  order: Order;

  /**
   * Order's owner user data.
   */
  userData: UserData;

  // Authorization checking
  authChecker: AuthChecker;
  private sub1: Subscription;
  private sub2: Subscription;

  // I18N
  countries: Country[] = this.i18n.defaultTranslations.countries;
  categories: Category[] = this.i18n.defaultTranslations.categories;
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private accountService: OrderService,
    private authService: AuthService,
    private i18n: I18nService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.categories = t.categories;
        this.countries = t.countries;
        this.locale = t.locale;
        this.messages = t.messages;
        this.setTitle();
      },
    );

    this.setTitle();

    this.authChecker = new AuthChecker(this.authService);

    this.sub1 = this.authChecker.onAuthenticated.mergeMap(userData => {
      this.userData = userData;
      const id = this.route.snapshot.params.id;
      return this.accountService.getUserOrder(id);
    }).subscribe(
      order => this.order = order,
      this.utils.handleComponentError.bind(this.utils),
    );

    this.sub2 = this.authChecker.onNotAuthenticated.subscribe(
      () => this.router.navigate([`/${this.locale}/auth/sign-in`]),
      this.utils.handleComponentError.bind(this.utils),
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
   * Sets page title for current page.
   */
  private setTitle(): void {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.account.myAccount}`
    );
  }

  /**
   * Calculates product price due to curreny rate.
   * @param {CartItem} item
   * @return {number}
   */
  getItemPrice(item: CartItem) {
    const rate = this.order.currency.rate;
    return Math.ceil(item.product.price * rate);
  }

  /**
   * Calculates total cost of an order.
   * @return {number}
   */
  get total() {
    let total = 0;
    this.order.items.map(item => {
      const rate = this.order.currency.rate;
      total += item.quantity * Math.ceil(item.product.price * rate);
    });
    return total;
  }

  /**
   * Gets current country name due to current locale.
   * @return {string}
   */
  get country() {
    const country = this.countries.find(
      x => x.code === this.order.deliveryData.country,
    );
    return country.name;
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.authChecker.unsubscribe();
  }
}
