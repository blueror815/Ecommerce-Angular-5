import {CartItem} from '../interfaces/cart-item';
import mockCartItems from './mock-cart-items';

const cartItems = mockCartItems;

const mockCarts: CartItem[][] = [
  [cartItems[1], cartItems[3]],
  [cartItems[0], cartItems[3]],
  [cartItems[2]],
];

export default mockCarts;
