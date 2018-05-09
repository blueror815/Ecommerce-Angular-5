import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

import {Messages} from '../../i18n/messages/messages';
import {I18nService} from '../../i18n/i18n.service';
import {Locale} from '../../i18n/locale';

/**
 * NotFound page component class.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.template.html',
})
export class NotFoundComponent implements OnInit, OnDestroy {
  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private i18n: I18nService,
    private title: Title,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
        this.setTitle();
      },
    );
    this.setTitle();
  }

  /**
   * Sets current page title.
   */
  private setTitle(): void {
    this.title.setTitle(`${this.messages.common.misona} - 404`);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
