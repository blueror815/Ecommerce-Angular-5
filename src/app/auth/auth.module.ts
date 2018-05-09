import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {HelpersModule} from '../helpers/helpers.module';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {AuthRoutingModule} from './auth-routing.module';

/**
 * Auth module class.
 */
@NgModule({
  declarations: [
    PasswordResetComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    HelpersModule,
    FormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
