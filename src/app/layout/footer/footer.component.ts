import {Component, OnDestroy, OnInit} from '@angular/core';

import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Subscription} from 'rxjs/Subscription';
import {Locale} from '../../i18n/locale';
import {LayoutService} from '../../services/layout.service';

/**
 * Footer component class.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.template.html',
  styles: [`
    h4 {
      margin-bottom: 0.5rem;
    }
    
    @media (max-width: 633px) {
      .footer-settings-item {
        max-width: 225px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  `],
})
export class FooterComponent implements OnInit, OnDestroy {
  /**
   * Browser window object.
   * @type {Window}
   */
  private readonly window = window;

  /**
   * Flag indicating if the footer is hidden on the page.
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
  private tSub: Subscription;

  constructor(
    private i18n: I18nService,
    private layoutService: LayoutService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
      },
    );

    this.layoutSub = this.layoutService.isMainLayout$.subscribe(
      isMainLayout => this.isHidden = !isMainLayout,
    );
  }

  /**
   * Scroll to top (arrow-up) button onClick event handler.
   * Scrolls the page to top.
   */
  scrollToTop() {
    this.window.scrollTo(0, 0);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.layoutSub.unsubscribe();
    this.tSub.unsubscribe();
  }
}
