import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoadingPlaceholderComponent} from './loading-placeholder.component';
import {SubmitButtonComponent} from './submit-button.component';

/**
 * Helpers module class.
 */
@NgModule({
  declarations: [
    LoadingPlaceholderComponent,
    SubmitButtonComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingPlaceholderComponent,
    SubmitButtonComponent,
  ],
})
export class HelpersModule {}
