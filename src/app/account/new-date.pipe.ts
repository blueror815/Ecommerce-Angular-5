import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../i18n/i18n.service';

/**
 * A pipe for date localication.
 */
@Pipe({
  name: 'newDate',
  pure: false,
})
export class NewDatePipe implements PipeTransform {

  /**
   * Current app locale.
   * @type {Locale}
   */
  private locale = this.i18n.defaultTranslations.locale;

  constructor(private i18n: I18nService) {
    this.i18n.translations$.subscribe(
      t => this.locale = t.locale,  // updating locale
    );
  }

  /**
   * @inheritDoc
   * @param {string} dateStr string representation of the date
   * @param {boolean} dateOnly if true shows only date without time
   * @return {string}
   */
  transform(dateStr: string, dateOnly = false) {
    const date = new Date(dateStr);
    const displayDate = date.toLocaleDateString(this.locale);
    if (dateOnly) {
      return displayDate;
    } else {
      const displayTime = date.toLocaleTimeString(
        this.locale,
        { hour: 'numeric', minute: 'numeric' },
      );
      return `${displayDate} ${displayTime}`;
    }
  }

}
