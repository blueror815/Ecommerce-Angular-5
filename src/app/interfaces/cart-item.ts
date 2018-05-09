import {Product} from './product';

/**
 * Cart items type declaration.
 * Used to indicate product quantity in cart or order.
 */
export interface CartItem {
  product: Product;
  quantity: number;
  shortId?: string;
}
