import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/first';

import {CartItem} from '../interfaces/cart-item';
import {Product} from '../interfaces/product';
import {FatalError} from '../errors/fatal-error';
import {LocalStorageService} from './local-storage.service';

/**
 * Shopping cart service.
 */
@Injectable()
export class CartService {
  /**
   * Local storage key for cart items.
   * @type {string}
   */
  private readonly cartItemsKey = 'cartItems';

  /**
   * Currently stored cart items
   */
  public items$: Observable<CartItem[]>;

  /**
   * Cart items subject. Used for emitting events on actions on cart.
   * @type {ReplaySubject<any>}
   */
  private itemsSubject: ReplaySubject<CartItem[]> = new ReplaySubject(1);

  constructor(private storage: LocalStorageService) {
    this.items$ = this.itemsSubject.asObservable();
    this.itemsSubject.next(this.parseItems());
  }

  /**
   * Parses local storage string to cart items array of objects.
   * @return {CartItem[]}
   */
  private parseItems(): CartItem[] {
    const rawItems = this.storage.getItem(this.cartItemsKey);
    try {
      return JSON.parse(rawItems) as CartItem[] || [];
    } catch (err) {
      this.clearCart();
      return [];
    }
  }

  /**
   * Adds new cart item to storage.
   * @param {Product} product
   */
  public addItem(product: Product): void {
    this.itemsSubject.first().subscribe(items => {
      let targetItem = items.find(x => x.product.id === product.id);
      if (targetItem) {
        // increment
        targetItem.quantity++;
      } else {
        // new item
        targetItem = {
          product: product,
          quantity: 1,
        };
        items.push(targetItem);
      }
      this.updateItems(items);
    });
  }

  /**
   * Changes quantity of a cart item.
   * @param {CartItem} item target cart item
   * @param {number} quantity new quantity
   */
  public changeItemQuantity(item: CartItem, quantity: number): void {
    this.itemsSubject.first().subscribe(items => {
      const targetItem = items.find(x => x.product.id === item.product.id);
      if (!targetItem) {
        throw new FatalError();
      } else {
        targetItem.quantity = quantity;
      }
      this.updateItems(items);
    });
  }

  /**
   * Removes a cart item from storage.
   * @param {CartItem} item target cart item
   */
  public removeItem(item: CartItem): void {
    this.itemsSubject.first().subscribe(items => {
      const filteredItems = items.filter(
        x => x.product.id !== item.product.id,
      );
      this.updateItems(filteredItems);
    });
  }

  /**
   * Clears local storage variable for cart items.
   */
  public clearCart(): void {
    this.storage.removeItem(this.cartItemsKey);
    this.itemsSubject.next([]);
  }

  /**
   * Records changes on cart into local storage.
   * @param {CartItem[]} items
   */
  private updateItems(items: CartItem[]) {
    try {
      const stringified = JSON.stringify(items);
      this.storage.setItem(this.cartItemsKey, stringified);
      this.itemsSubject.next(items);
    } catch (err) {
      throw new FatalError();
    }
  }
}
