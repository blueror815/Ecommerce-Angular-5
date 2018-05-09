import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';
import {LayoutService} from '../../services/layout.service';

/**
 * Global jQuery object declaration.
 */
declare const jQuery: any;

/**
 * Header component class.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Flag indicating whether the header is hidden on the page.
   * (It is always hidden on checkout).
   * @type {boolean}
   */
  isHidden = false;

  /**
   * Layout change event emitter subscription.
   */
  private layoutSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private translationsSub: Subscription;

  constructor(
    private i18n: I18nService,
    private layoutService: LayoutService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.translationsSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
      },
    );

    this.layoutSub = this.layoutService.isMainLayout$.subscribe(
      isMainLayout => this.isHidden = !isMainLayout,
    );

    const indicator = jQuery('#navbarTogglerIndicator');
    const collapse = jQuery('#navbarCollapse');
    collapse
      .on('show.bs.collapse', () => {
        indicator.removeClass('fa-bars');
        indicator.addClass('fa-times');
      })
      .on('hide.bs.collapse', () => {
        indicator.removeClass('fa-times');
        indicator.addClass('fa-bars');
      });

    jQuery('body').on('click', (event) => {
      const parents = jQuery(event.target).parents('#navbarCollapse');
      if (parents.length === 0) {
        collapse.collapse('hide');
      }
    });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.layoutSub.unsubscribe();
    this.translationsSub.unsubscribe();
  }
}
