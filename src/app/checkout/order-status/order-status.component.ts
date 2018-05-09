import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {OrderService} from '../../services/order.service';
import {CartItem} from '../../interfaces/cart-item';
import {NotFoundException} from '../../errors/not-found.exception';
import {Order} from '../../interfaces/order';
import {AuthService} from '../../services/auth.service';
import {UserData} from '../../interfaces/user-data';
import {UtilsService} from '../../services/utils.service';
import {Messages} from '../../i18n/messages/messages';
import {I18nService} from '../../i18n/i18n.service';
import {Locale} from '../../i18n/locale';
import {LayoutService} from '../../services/layout.service';

/**
 * Order status component class.
 */
@Component({
  templateUrl: 'order-status.template.html',
  styleUrls: ['../checkout.styles.css'],
})
export class OrderStatusComponent implements OnInit, OnDestroy {

  /**
   * Browser window location object.
   * @type {Location}
   */
  private readonly location = location;

  /**
   * Target order ID.
   */
  id: any;

  /**
   * Customer's fullName.
   */
  fullName: string;

  /**
   * Target order
   */
  order: Order;

  /**
   * Target order's cart items.
   */
  items: CartItem[];

  /**
   * Email form model.
   */
  email: string;

  /**
   * Order short ID form model.
   */
  shortId: string;

  // flags
  isPending = false;
  isFormPending = false;
  isCredentialsInvalid = false;

  // service subsciptions
  private getOrderSub: Subscription;
  private onSubmitSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  countries = this.i18n.defaultTranslations.countries;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private authService: AuthService,
    private i18n: I18nService,
    private layoutService: LayoutService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private title: Title,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.countries = t.countries;
        this.locale = t.locale;
        this.messages = t.messages;
        this.setTitle();
      },
    );
    this.setTitle();

    this.layoutService.isMainLayout = false;

    this.id = this.route.snapshot.params.id;

    this.isPending = true;
    this.getOrderSub = this.getOrder().subscribe(
      () => this.isPending = false,
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * Sets current page title.
   */
  private setTitle(): void {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.order.orderStatus}`
    );
  }

  /**
   * Initializes an order.
   * @return {Observable<void>}
   */
  private getOrder(): Observable<void> {
    return this.authService.userData$.first().mergeMap(userData => {
      const order = this.orderService.getCachedOrder(this.id);
      if (order) {
        return Observable.of(this.initCachedOrder(order, userData));
      } else {
        return this.getRemoteOrder(userData);
      }
    });
  }

  /**
   * Retrieves order from cache.
   * @param {Order} order
   * @param {UserData} userData
   */
  private initCachedOrder(order: Order, userData: UserData): void {
    this.order = order;
    this.items = this.order.items;
    this.fullName = userData ? userData.fullName :
      this.order.deliveryData.fullName;
  }

  /**
   * Retrieves order from back-end.
   * @param {UserData} userData
   * @return {Observable<void>}
   */
  private getRemoteOrder(userData: UserData): Observable<void> {
    /*if (userData) {
      return this.orderService.getUserOrder(this.id)
        .map(order => {
          this.order = order;
          this.items = this.order.items;
          this.fullName = userData.fullName;
        });
    } else {
      return this.orderService.getOrderItems(this.id)
        .map(items => {
          this.items = items;
        });
    }*/
    return this.orderService.getUserOrder(this.id)
      .map(order => {
        this.order = order;
        this.items = this.order.items;
        if (userData) {
          this.fullName = userData.fullName;
        }
      });
  }

  /**
   * Gets country name of the target order.
   * @return {string}
   */
  get country(): string {
    if (this.order) {
      const country = this.countries.find(
        x => x.code === this.order.deliveryData.country,
      );
      return country.name;
    } else {
      return null;
    }
  }

  /**
   * Login form onSubmit event handler.
   */
  onSubmit(): void {
    this.isFormPending = true;
    this.isCredentialsInvalid = false;
    this.onSubmitSub = this.orderService.getOrderByCredentials(
      this.id,
      this.shortId,
      this.email
    ).subscribe(
        order => {
          this.order = order;
          this.items = this.order.items;
          this.fullName = this.order.deliveryData.fullName;
          this.isFormPending = false;
        },
        err => {
          if (err instanceof NotFoundException) {
            this.isCredentialsInvalid = true;
            this.isFormPending = false;
          } else {
            this.utils.handleComponentError(err);
          }
        }
      );
  }

  ngOnDestroy() {
    this.layoutService.isMainLayout = true;
    this.tSub.unsubscribe();
    this.getOrderSub && this.getOrderSub.unsubscribe();
    this.onSubmitSub && this.onSubmitSub.unsubscribe();
  }

}
