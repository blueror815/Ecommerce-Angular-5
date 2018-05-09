import {Component, Input} from '@angular/core';

/**
 * Advanced submit button component class.
 */
@Component({
  selector: 'app-submit-button',
  template: `
    <button type="submit" class="btn btn-primary" [class.is-pending]="isPending">
      <span class="label">{{ label }}</span>
      <span class="pending-indicator">
        <span class="fa fa-spinner fa-pulse"></span>
      </span>
    </button>
  `,
  styles: [`
    .btn > .pending-indicator {
      display: none;
    }

    .btn.is-pending {
      position: relative;
    }

    .btn.is-pending > .label {
      visibility: hidden;
    }

    .btn.is-pending > .pending-indicator {
      color: inherit;
      position: absolute;
      display: inline;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `],
})
export class SubmitButtonComponent {
  /**
   * Submit button label.
   */
  @Input('label') label = 'Submit';

  /**
   * "Pending" flag.
   */
  @Input() isPending = false;
}
