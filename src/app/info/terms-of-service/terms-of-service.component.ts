import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';

/**
 * Terms of Service component.
 * Renders Terms of Service text in language due to current app locale.
 */
@Component({
  templateUrl: './terms-of-service.template.html',
})
export class TermsOfServiceComponent implements OnInit, OnDestroy {
  /**
   * Browser window object.
   * @type {Window}
   */
  private readonly window = window;

  // I18N
  locale = this.i18n.defaultTranslations.locale;
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
    this.window.scrollTo(0, 0);
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
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.info.termsOfService}`
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
