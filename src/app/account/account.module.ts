import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderListComponent} from './order-list/order-list.component';
import {HelpersModule} from '../helpers/helpers.module';
import {OrderStatusPipe} from './order-status.pipe';
import {SettingsModule} from '../settings/settings.module';
import {NewDatePipe} from './new-date.pipe';
import {AccountRoutingModule} from './account-routing.module';

/**
 * Account module class.
 */
@NgModule({
  declarations: [
    NewDatePipe,
    OrderDetailComponent,
    OrderListComponent,
    OrderStatusPipe,
  ],
  imports: [
    CommonModule,
    HelpersModule,
    SettingsModule,
    AccountRoutingModule,
  ],
})
export class AccountModule {}
