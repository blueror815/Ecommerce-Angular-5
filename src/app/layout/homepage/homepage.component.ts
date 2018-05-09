import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Category} from '../../interfaces/category';
import {Messages} from '../../i18n/messages/messages';
import {I18nService} from '../../i18n/i18n.service';
import {Subscription} from 'rxjs/Subscription';
import {Locale} from '../../i18n/locale';

/**
 * Homepage component class.
 */
@Component({
  templateUrl: './homepage.template.html',
})
export class HomepageComponent implements OnInit, OnDestroy {

  /**
   * Category list expanded flag.
   * @type {boolean}
   */
  expanded = false;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  categories: Category[] = this.i18n.defaultTranslations.categories;
  messages: Messages = this.i18n.defaultTranslations.messages;
  tSub: Subscription;

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
        this.categories = t.categories;
        this.locale = t.locale;
        this.messages = t.messages;
        this.setTitle();
      }
    );
  }

  /**
   * Sets current page title.
   */
  private setTitle(): void {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.common.home}`
    );
  }

  /**
   * "Show more" link onclick event handler.
   * Expands category list.
   */
  expand() {
    this.expanded = true;
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
