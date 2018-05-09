import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/last';

import {I18nService} from '../../i18n/i18n.service';
import {RouteHistoryService} from '../../services/route-history.service';
import {Messages} from '../../i18n/messages/messages';
import {Language} from '../../i18n/language';
import {Locale} from '../../i18n/locale';

import languages from '../../i18n/languages';
import {UtilsService} from '../../services/utils.service';

/**
 * Select language component class.
 */
@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.template.html',
  styleUrls: ['../select.styles.css'],
})
export class SelectLanguageComponent implements OnInit, OnDestroy {
  /**
   * List of available languages.
   * @type {Language[]}
   */
  readonly languages: Language[] = languages;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private history: RouteHistoryService,
    private i18n: I18nService,
    private router: Router,
    private utils: UtilsService,
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
  }

  /**
   * Language dropdown list onChange event handler.
   */
  onChange() {
    this.i18n.locale = this.locale;
    let pathRest;
    this.history.currentPath$.last().subscribe(
      path => pathRest = path.substr(4),
      this.utils.handleComponentError.bind(this.utils),
      () => {
        const redirectPath =
          !!pathRest ? `/${this.locale}/${pathRest}` : `/${this.locale}`;
        this.router.navigateByUrl(redirectPath);
      },
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
