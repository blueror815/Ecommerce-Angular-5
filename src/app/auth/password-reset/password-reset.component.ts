import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AuthChecker} from '../../helpers/auth-checker';
import {AuthService} from '../../services/auth.service';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';

/**
 * Password reset component class.
 */
@Component({
  templateUrl: './password-reset.template.html',
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  // Auth checking
  authChecker: AuthChecker;
  private sub1: Subscription;

  /**
   * Password reset service subscription.
   */
  private sub: Subscription;

  // "Pending" flags
  isFormPending = false;
  isComplete = false;

  /**
   * Email form model.
   */
  email: string;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private authService: AuthService,
    private i18n: I18nService,
    private router: Router,
    private title: Title,
    private utils: UtilsService,
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

    this.authChecker = new AuthChecker(this.authService);
    this.sub1 = this.authChecker.onAuthenticated.subscribe(
      () => this.router.navigate([`/${this.locale}`]),
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * Sets current page title.
   */
  private setTitle() {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.auth.resetPassword}`
    );
  }

  /**
   * OnSubmit event handler.
   */
  onSubmit() {
    this.isFormPending = true;
    this.sub = this.authService.resetPassword(this.email)
      .subscribe(
        () => this.isComplete = true,
        this.utils.handleComponentError.bind(this.utils),
      );
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.sub && this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.authChecker.unsubscribe();
  }
}
