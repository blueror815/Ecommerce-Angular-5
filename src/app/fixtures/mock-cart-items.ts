import {CartItem} from '../interfaces/cart-item';
import mockProducts from './mock-products';

const products = mockProducts;

const mockCartItems: CartItem[] = [
  { product: products[0], quantity: 1, shortId: 'ABC1' },
  { product: products[1], quantity: 3, shortId: 'ABC2' },
  { product: products[2], quantity: 2, shortId: 'ABC3' },
  { product: products[3], quantity: 4, shortId: 'ABC4' },
];

export default mockCartItems;
