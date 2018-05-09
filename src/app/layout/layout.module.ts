import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AuthLinksComponent} from './header/auth-links/auth-links.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {SearchBarComponent} from './header/search-bar/search-bar.component';
import {NavbarCollapseComponent} from './header/navbar-collapse/navbar-collapse.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CartButtonComponent} from './header/cart-button/cart-button.component';
import {SettingsModule} from '../settings/settings.module';
import {SocialLinksComponent} from './footer/social-links/social-links.component';

/**
 * Layout module class.
 * The module contains common pages as homepage and error page
 * and also header & footer.
 */
@NgModule({
  declarations: [
    AuthLinksComponent,
    CartButtonComponent,
    ErrorPageComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    NavbarCollapseComponent,
    NotFoundComponent,
    SearchBarComponent,
    SocialLinksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SettingsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ],
})
export class LayoutModule {}
