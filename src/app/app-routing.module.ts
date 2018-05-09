import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './layout/homepage/homepage.component';
import {ErrorPageComponent} from './layout/error-page/error-page.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {CartPageComponent} from './cart/page/cart-page.component';

const routes: Routes = [
  // The info module is loaded with lazy loading.
  {
    path: ':locale/info',
    loadChildren: 'app/info/info.module#InfoModule',
  },
  // Other modules are loaded synchronously.
  { path: ':locale/cart', component: CartPageComponent },
  { path: ':locale/error/:type', component: ErrorPageComponent },
  { path: ':locale/error', component: ErrorPageComponent },
  { path: ':locale', component: HomepageComponent },
  { path: '**', component: NotFoundComponent },
];

/**
 * App module class.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
