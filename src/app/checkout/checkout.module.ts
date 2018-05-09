import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HelpersModule} from '../helpers/helpers.module';
import {CheckoutItemsComponent} from './items/checkout-items.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {SettingsModule} from '../settings/settings.module';
import {CheckoutRoutingModule} from './checkout-routing.module';

/**
 * Checkout module class.
 */
@NgModule({
  declarations: [
    CheckoutItemsComponent,
    ConfirmationComponent,
    OrderStatusComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HelpersModule,
    SettingsModule,
    CheckoutRoutingModule,
  ],
})
export class CheckoutModule {}
