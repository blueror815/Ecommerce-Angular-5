import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OrderStatusComponent} from './order-status/order-status.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';

/**
 * Checkout module routes
 */
const checkoutRoutes: Routes = [
  {
    path: ':locale/checkout',
    children: [
      { path: 'order-status/:id', component: OrderStatusComponent },
      { path: 'repeat/:id', component: ConfirmationComponent },
      { path: '', component: ConfirmationComponent },
    ],
  }
];

/**
 * Checkout routing module class.
 */
@NgModule({
  imports: [
    RouterModule.forChild(checkoutRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CheckoutRoutingModule {}
