import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';

/**
 * Help page component class.
 * Includes FAQ component (in current app language) and contactUs component.
 */
@Component({
  templateUrl: './help.template.html',
})
export class HelpComponent implements OnInit {

  // I18N
  locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  /**
   * URL fragment #contact-us (if any).
   * @type {string}
   */
  fragment = this.route.snapshot.fragment;

  constructor(
    private i18n: I18nService,
    private route: ActivatedRoute,
    private title: Title,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
        this.setTitle();
      },
    );
    this.setTitle();

    if (!this.fragment) {
      window.scrollTo(0, 0);
    }
  }

  /**
   * Sets current page title.
   */
  private setTitle(): void {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.info.help}`
    );
  }

  /**
   * FAQ component onOffset event handler.
   * Used for auto-scrolling to contactUs form.
   * @param {number} offset
   */
  onOffset(offset: number) {
    if (this.fragment === 'contact-us') {
      window.scrollTo(0, offset);
    }
  }

}
