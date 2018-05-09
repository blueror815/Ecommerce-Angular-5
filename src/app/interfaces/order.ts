import {CartItem} from './cart-item';
import {DeliveryData} from './delivery-data';
import {OrderStatus} from './order-status';
import {Currency} from '../settings/currency/currency';

/**
 * Order type declaration.
 */
export interface Order {
  unique_id: any;
  shortId: number|null;
  date: Date|null;
  status: OrderStatus|null;
  currency: Currency;
  items: CartItem[];
  deliveryData: DeliveryData|null;
}
