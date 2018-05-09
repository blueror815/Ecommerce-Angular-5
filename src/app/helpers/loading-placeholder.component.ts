import {Component, Input} from '@angular/core';

/**
 * "Loading" placeholder component class.
 */
@Component({
  selector: 'app-loading-placeholder',
  template: `
    <div class="text-center">
      <span class="text-muted">
        <p class="mb-2">{{ message }}</p>
        <p class="fa fa-spinner fa-pulse"></p>
      </span>
    </div>
  `,
})
export class LoadingPlaceholderComponent {
  /**
   * Message appearing while loading.
   */
  @Input('message') message: string;
}
