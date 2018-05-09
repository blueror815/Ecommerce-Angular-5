import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Order} from '../interfaces/order';
import {CartItem} from '../interfaces/cart-item';
import {DeliveryData} from '../interfaces/delivery-data';
import {CartService} from './cart.service';
import {LocalStorageService} from './local-storage.service';
import {AuthService} from './auth.service';
import {Currency} from '../settings/currency/currency';

/**
 * Order service class.
 * Used for working with orders and customer delivery data.
 */
@Injectable()
export class OrderService {
  /**
   * Customer delivery data local storage key.
   * @type {string}
   */
  private readonly deliveryDataKey = 'deliveryData';

  /**
   * Orders cache.
   * Contains orders made during current session.
   * @type {Array}
   */
  private cachedOrders: Order[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cartService: CartService,
    private storage: LocalStorageService,
  ) {}

  /**
   * Retrieves from back-end all orders of currently authenticated user
   * and sorts them from newer to older.
   * @return {Observable<Order[]>}
   */
  public getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/orders')
      .map(orders => orders.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      }));
  }

  /**
   * Retrieves from back-end and order of currently authenticated user
   * by its ID.
   * @param id target order ID
   * @return {Observable<Order>}
   */
  public getUserOrder(id: any): Observable<Order> {
    const params = new HttpParams().set('id', `${id}`);
    return this.http.get<Order>('/order', { params });
  }

  /**
   * Retireves from back-end all cart items of an order.
   * @param id target order ID
   * @return {Observable<CartItem[]>}
   */
  public getOrderItems(id: any): Observable<CartItem[]> {
    const params = new HttpParams().set('id', `${id}`);
    return this.http.get<CartItem[]>('/order-items', { params });
  }

  /**
   * Performs placeOrder request to back-end.
   * @param {DeliveryData} deliveryData
   * @param {CartItem[]} items
   * @param {Currency} currency
   * @return {Observable<any>}
   */
  public placeOrder(
    deliveryData: DeliveryData,
    items: CartItem[],
    currency: Currency,
  ): Observable<any> {
    return this.http.post<Order>('/order', { items, deliveryData, currency })
      .map(order => {
        // caching placed order
        this.cachedOrders.push(order);
        this.cartService.clearCart();
        return order.unique_id;
      });
  }

  /**
   * Gets an order from cache by its ID.
   * If no order with this ID is cached, null is returned.
   * @param id
   * @return {Order}
   */
  public getCachedOrder(id: any): Order|null {
    return this.cachedOrders.find(x => x.unique_id === id) || null;
  }

  public getOrderByCredentials(id: any, shortId: string, email: string): Observable<Order> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('shortId', shortId)
      .set('email', email);
    return this.http.get<Order>('/order-by-credentials', { params });
  }

  /**
   * Gets user last delivery data from browser storage or from back-end.
   * @return {Observable<DeliveryData>}
   */
  public get lastDeliveryData$(): Observable<DeliveryData> {
    const deliveryDataRaw = this.storage.getItem(this.deliveryDataKey);
    if (deliveryDataRaw) {
      const deliveryData = JSON.parse(deliveryDataRaw) as DeliveryData;
      return Observable.of(deliveryData);
    } else {
      return this.authService.userData$.mergeMap(userData => {
        if (userData) {
          return this.lastDeliveryDataHttp$.map(deliveryData => {
            this.storeDeliveryData(deliveryData);
            return deliveryData;
          });
        } else {
          return Observable.of(null);
        }
      });
    }
  }

  /**
   * Stores current customer delivery data in local storage.
   * @param {DeliveryData} deliveryData
   */
  public storeDeliveryData(deliveryData: DeliveryData): void {
    this.storage.setItem(this.deliveryDataKey, JSON.stringify(deliveryData));
  }

  /**
   * Removes stored customer delivery data from local storage.
   */
  public removeDeliveryData(): void {
    this.storage.removeItem(this.deliveryDataKey);
  }

  /**
   * Retrieves customer last delivery data from back-end.
   * @return {Observable<DeliveryData>}
   */
  private get lastDeliveryDataHttp$(): Observable<DeliveryData> {
    return this.http.get<DeliveryData>('/last-delivery-data');
  }

}
