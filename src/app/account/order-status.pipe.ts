import {Pipe, PipeTransform} from '@angular/core';

import {OrderStatus} from '../interfaces/order-status';
import {I18nService} from '../i18n/i18n.service';
import {Messages} from '../i18n/messages/messages';

/**
 * A pipe for textual representations of order statuses.
 */
@Pipe({
  name: 'orderStatus',
  pure: false,
})
export class OrderStatusPipe implements PipeTransform {
  /**
   * I18N messages.
   * @type {Messages}
   */
  private messages: Messages = this.i18n.defaultTranslations.messages;

  constructor(private i18n: I18nService) {
    this.i18n.translations$.subscribe(
      t => this.messages = t.messages,
    );
  }

  transform(status: OrderStatus): string {
    if (status === OrderStatus.Unfulfilled) {
      return this.messages.order.unfulfilled;
    } else if (status === OrderStatus.Fulfilled) {
      return this.messages.order.fulfilled;
    } else {
      return null;
    }
  }
}
