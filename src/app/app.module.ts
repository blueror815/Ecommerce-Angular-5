import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {AuthService} from './services/auth.service';
import {TokenService} from './services/token.service';
import {LocalStorageService} from './services/local-storage.service';
import {SessionStorageService} from './services/session-storage.service';
import {OrderService} from './services/order.service';
import {CartService} from './services/cart.service';
import {RouteHistoryService} from './services/route-history.service';
import {AppInterceptor} from './http/app.interceptor';
import {UtilsService} from './services/utils.service';
import {I18nService} from './i18n/i18n.service';
import {SignOutService} from './services/sign-out.service';
import {CartModule} from './cart/cart.module';
import {ProductService} from './services/product.service';
import {LayoutService} from './services/layout.service';
import {AccountModule} from './account/account.module';
import {AuthModule} from './auth/auth.module';
import {CheckoutModule} from './checkout/checkout.module';
import {ProductModule} from './product/product.module';

/**
 * Main app module class.
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    CartModule,
    AccountModule,
    AuthModule,
    CheckoutModule,
    ProductModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    AuthService,
    CartService,
    I18nService,
    LayoutService,
    LocalStorageService,
    OrderService,
    ProductService,
    RouteHistoryService,
    SessionStorageService,
    SignOutService,
    TokenService,
    UtilsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
