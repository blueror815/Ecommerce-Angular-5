import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';

/**
 * Account module routes.
 */
const accountRoutes: Routes = [
  {
    path: ':locale/account',
    children: [
      { path: 'order/:id', component: OrderDetailComponent },
      { path: '', component: OrderListComponent },
    ],
  }
];

/**
 * Account routing module class.
 */
@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AccountRoutingModule {}
