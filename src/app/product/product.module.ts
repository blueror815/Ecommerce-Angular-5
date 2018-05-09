import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductDetailComponent} from './detail/product-detail.component';
import {HelpersModule} from '../helpers/helpers.module';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchByCategoryComponent} from './search-by-category/search-by-category.component';
import {SearchByKeywordsComponent} from './search-by-keywords/search-by-keywords.component';
import {SettingsModule} from '../settings/settings.module';
import {ProductRoutingModule} from './product-routing.module';

/**
 * Product module.
 * Implements product search by keywords and categories,
 * displaying search results and product details.
 */
@NgModule({
  declarations: [
    ProductDetailComponent,
    SearchByCategoryComponent,
    SearchByKeywordsComponent,
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    HelpersModule,
    SettingsModule,
    ProductRoutingModule,
  ],
})
export class ProductModule {}
