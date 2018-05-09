import {Order} from '../interfaces/order';
import {OrderStatus} from '../interfaces/order-status';

import mockCarts from './mock-carts';
import mockDeliveries from './mock-delivery-data';

const carts = mockCarts;
const deliveries = mockDeliveries;

const mockOrders: Order[] = [
  /*{
    id: 3,
    shortId: 1003,
    date: new Date(2017, 8, 1),
    status: OrderStatus.Unfulfilled,
    items: carts[0],
    deliveryData: deliveries[0],
  },*/
  /*{
    id: 2,
    shortId: 1002,
    date: new Date(2017, 7, 31),
    status: OrderStatus.Unfulfilled,
    items: carts[1],
    deliveryData: deliveries[0],
  },*/
  /*{
    id: 1,
    shortId: 1001,
    date: new Date(2017, 7, 30),
    status: OrderStatus.Fulfilled,
    items: carts[2],
    deliveryData: deliveries[0],
  },*/
];

export default mockOrders;
