import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

import {RouteHistoryService} from '../../services/route-history.service';
import {ExceptionType} from '../../errors/exception-type';
import {Messages} from '../../i18n/messages/messages';
import {I18nService} from '../../i18n/i18n.service';
import {Locale} from '../../i18n/locale';

/**
 * Error page component.
 * Displays appropriate FatalError, NoConnection or Timeout message.
 */
@Component({
  templateUrl: './error-page.template.html'
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  // Exception type flags
  isFatal = true;
  isOffline = false;
  isTimeout = false;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  /**
   * Previously visited route.
   * When "Try again" link clicked, user is automatically redirected to this route.
   * @type {string}
   */
  previousRoute = `/${this.locale}`;

  constructor(
    private history: RouteHistoryService,
    private i18n: I18nService,
    private route: ActivatedRoute,
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

    const type = +this.route.snapshot.params.type as ExceptionType;
    this.setExceptionFromType(type);

    this.history.previousPath$.subscribe(
      route => this.previousRoute = route || `/${this.locale}`,
    );
  }

  /**
   * Sets current page title.
   */
  private setTitle(): void {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.errors.errorOccurred}`
    );
  }

  /**
   * Sets appropriate error flag values due to current exception type.
   * @param {ExceptionType} type
   */
  private setExceptionFromType(type: ExceptionType): void {
    switch (type) {
      case ExceptionType.NoConnection: {
        this.isFatal = false;
        this.isOffline = true;
        this.isTimeout = false;
        break;
      }
      case ExceptionType.Timeout: {
        this.isFatal = false;
        this.isOffline = false;
        this.isTimeout = true;
        break;
      }
      default: {
        this.isFatal = true;
        this.isOffline = false;
        this.isTimeout = false;
      }
    }
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
