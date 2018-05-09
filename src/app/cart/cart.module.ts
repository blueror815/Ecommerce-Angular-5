import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CartPageComponent} from './page/cart-page.component';
import {CartModalComponent} from './modal/cart-modal.component';
import {CartItemComponent} from './item/cart-item.component';
import {HelpersModule} from '../helpers/helpers.module';
import {CartFooterComponent} from './footer/cart-footer.component';
import {SettingsModule} from '../settings/settings.module';

/**
 * Cart module class.
 */
@NgModule({
  declarations: [
    CartFooterComponent,
    CartPageComponent,
    CartItemComponent,
    CartModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HelpersModule,
    SettingsModule,
  ],
  exports: [
    CartPageComponent,
    CartModalComponent,
  ],
})
export class CartModule {}
