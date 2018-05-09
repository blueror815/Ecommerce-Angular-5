import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';

/**
 * Auth module routes.
 */
const authRoutes: Routes = [
  {
    path: ':locale/auth',
    children: [
      { path: 'reset-password', component: PasswordResetComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  }
];

/**
 * Auth routing module class.
 */
@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AuthRoutingModule {}
