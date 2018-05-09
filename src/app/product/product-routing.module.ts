import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchByKeywordsComponent} from './search-by-keywords/search-by-keywords.component';
import {ProductDetailComponent} from './detail/product-detail.component';
import {SearchByCategoryComponent} from './search-by-category/search-by-category.component';

/**
 * Product module routes.
 */
const productRoutes: Routes = [
  {
    path: ':locale/product',
    children: [
      { path: 'category/:id', component: SearchByCategoryComponent, },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'search/:keywords', component: SearchByKeywordsComponent },
    ],
  },
];

/**
 * Product routing module class.
 */
@NgModule({
  imports: [
    RouterModule.forChild(productRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProductRoutingModule {}
