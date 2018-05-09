import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';

import {OrderService} from '../../services/order.service';
import {CartItem} from '../../interfaces/cart-item';
import {NotFoundException} from '../../errors/not-found.exception';
import {AuthService} from '../../services/auth.service';
import {UserData} from '../../interfaces/user-data';
import {DeliveryData} from '../../interfaces/delivery-data';
import {CartService} from '../../services/cart.service';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';
import {CountryService} from '../../settings/country/country.service';
import {SignOutService} from '../../services/sign-out.service';
import {LayoutService} from '../../services/layout.service';
import {CurrencyService} from '../../settings/currency/currency.service';
import {Currency} from '../../settings/currency/currency';
import {CurrencyCode} from '../../settings/currency/currency-code';

/**
 * Order confirmation component class.
 */
@Component({
  templateUrl: 'confirmation.template.html',
  styleUrls: ['../checkout.styles.css'],
  styles: [`
    .btn > .pending-indicator {
      display: none;
    }

    .btn.is-pending {
      position: relative;
    }

    .btn.is-pending > .label {
      visibility: hidden;
    }

    .btn.is-pending > .pending-indicator {
      color: inherit;
      position: absolute;
      display: inline;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .form-group {
      position: relative;
    }
    
    .form-control {
      position: relative;
      height: 3rem;
    }
    
    .form-control::placeholder {
      opacity: 0;
    }
    
    .form-control + label {
      color: gray;
      position: absolute;
      top: 16px;
      left: 13px;
    }
    
    .form-control:focus, .form-control:not(:placeholder-shown) {
      padding-top: 1.25rem;
    }

    .form-control:focus + label, .form-control:not(:placeholder-shown) + label {
      top: 6px;
      font-size: 11px;
    }
  `],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  /**
   * Order delivery data.
   */
  deliveryData: DeliveryData;

  // Flags
  isDeliveryDataPending: boolean;
  isFormPending: boolean;
  isItemsPending: boolean;
  isCartDisabled = false;

  /**
   * Target orde cart items.
   */
  items: CartItem[];

  /**
   * Customer's user data (if any)
   */
  userData: UserData;

  /**
   * Current currency.
   * @type {{code: CurrencyCode; rate: number}}
   */
  currency: Currency = { code: CurrencyCode.JPY, rate: 1 };
  private currencySub: Subscription;

  // Service subscriptions
  private sub: Subscription;
  private authSub: Subscription;
  private itemsSub: Subscription;
  private placeOrderSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  countries = this.i18n.defaultTranslations.countries;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private i18n: I18nService,
    private layoutService: LayoutService,
    private location: Location,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private signOutService: SignOutService,
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

    this.deliveryData = {
      email: null,
      fullName: null,
      country: this.countryService.countryCodeSnapshot,
      city: null,
      postalCode: null,
      address: null,
      phone: null,
    };
    this.isDeliveryDataPending = true;
    this.isFormPending = false;
    this.isItemsPending = true;
    const rawId = this.route.snapshot.params.id;
    this.sub = this.getDeliveryData().subscribe(
      deliveryData => {
        if (deliveryData) {
          this.deliveryData = deliveryData;
        }
        this.isDeliveryDataPending = false;
      },
      this.utils.handleComponentError.bind(this.utils),
    );
    this.itemsSub = this.retrieveItems(rawId).subscribe(
      items => {
        this.items = items;
        this.isItemsPending = false;
      },
      this.utils.handleComponentError.bind(this.utils),
    );
    this.authSub = this.authService.userData$.subscribe(
      userData => {
        this.userData = userData;
        if (this.userData) {
          this.deliveryData.email = this.userData.email;
        }
      },
    );
    this.currencySub = this.currencyService.currency$.subscribe(
      currency => this.currency = currency,
    );
  }

  /**
   * Sets current page title.
   */
  private setTitle(): void {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.checkout.orderCheckout}`
    );
  }

  /**
   * Returns overall form pending flag.
   * @return {boolean}
   */
  public get isPending(): boolean {
    return this.isDeliveryDataPending || this.isItemsPending;
  }

  /**
   * "Logout" link onClick event handler.
   */
  public logout(): void {
    this.signOutService.signOut();
  }

  /**
   * Calculates total cost of the order items.
   * @return {number}
   */
  public get total(): number {
    let t = 0;
    this.items.map(x => {
      t += x.quantity * Math.ceil(x.product.price * this.currency.rate);
    });
    return t;
  }

  /**
   * Order confirmation form onSubmit event handler.
   */
  public onSubmit(): void {
    this.isFormPending = true;
    this.itemsSub.unsubscribe();
    this.placeOrderSub = this.orderService.placeOrder(this.deliveryData, this.items, this.currency)
      .subscribe(
        unique_id => {
          console.log('Unique ID: ', unique_id);
          this.router.navigate([`/${this.locale}/checkout/order-status`, unique_id]);
          this.location.replaceState(`/${this.locale}`);
        },
        err => this.utils.handleComponentError.bind(this.utils),
      );
  }

  /**
   * Retrieves service delivery data.
   * @return {Observable<DeliveryData>}
   */
  private getDeliveryData(): Observable<DeliveryData> {
    /*return this.authService.userData$.mergeMap(userData => {
      if (userData) {
        this.userData = userData;
        return this.orderService.lastDeliveryData$;
      } else {
        this.userData = null;
        return Observable.of(null);
      }
    });*/

    return this.orderService.lastDeliveryData$;
  }

  /**
   * Stores user delivery data on service.
   */
  storeDeliveryData() {
    this.orderService.storeDeliveryData(this.deliveryData);
  }

  /**
   * Gets current order's cart items.
   * @param {string} rawId
   * @return {Observable<CartItem[]>}
   */
  private retrieveItems(rawId: string): Observable<CartItem[]> {
    if (rawId) {
      // repeat order
      this.isCartDisabled = true;
      return this.repeatOrder(+rawId);
    } else {
      // new order
      return this.newOrder();
    }
  }

  /**
   * Initializes order confirmation form in "repeat order" mode.
   * @param {number} orderId
   * @return {Observable<CartItem[]>}
   */
  private repeatOrder(orderId: number): Observable<CartItem[]> {
    if (Number.isNaN(orderId)) {
      // 404
      return Observable.throw(new NotFoundException());
    } else {
      // repeatOrder
      return this.orderService.getOrderItems(orderId);
    }
  }

  /**
   * Initializes order confirmation form in "new order" mode.
   * @return {Observable<CartItem[]>}
   */
  private newOrder(): Observable<CartItem[]> {
    return this.cartService.items$.map(items => {
      if (!items || !items.length) {
        throw new NotFoundException();
      } else {
        return items;
      }
    });
  }

  ngOnDestroy() {
    this.layoutService.isMainLayout = true;
    this.tSub.unsubscribe();
    this.sub.unsubscribe();
    this.authSub.unsubscribe();
    this.itemsSub && this.itemsSub.unsubscribe();
    this.placeOrderSub && this.placeOrderSub.unsubscribe();
    this.currencySub && this.currencySub.unsubscribe();
  }
}
