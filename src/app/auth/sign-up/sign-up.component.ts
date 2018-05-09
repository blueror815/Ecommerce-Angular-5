import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../../services/auth.service';
import {AuthChecker} from '../../helpers/auth-checker';
import {ConflictException} from '../../errors/conflict.exception';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';

/**
 * Sign up component class.
 */
@Component({
  templateUrl: './sign-up.template.html',
})
export class SignUpComponent implements OnInit, OnDestroy {
  // Authorization checking
  authChecker: AuthChecker;
  private sub1: Subscription;

  /**
   * Sign up service subscription.
   */
  private signUpSub: Subscription;

  // Flags
  isFormPending = false;
  isEmailTaken = false;

  /**
   * FullName form model.
   */
  fullName: string;

  /**
   * Email form model.
   */
  email: string;

  /**
   * Password form model.
   */
  password: string;

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
      ${this.messages.auth.createAccount}`
    );
  }

  /**
   * Sign up form onSubmit event handler.
   */
  onSubmit() {
    this.isFormPending = true;
    this.signUpSub = this.authService
      .signUp(this.fullName, this.email, this.password,)
      .subscribe(
        () => this.router.navigate([`/${this.locale}`]),
        err => {
          if (err instanceof ConflictException) {
            this.isEmailTaken = true;
            this.isFormPending = false;
          } else {
            this.utils.handleComponentError(err);
          }
        }
      );
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.sub1.unsubscribe();
    this.authChecker.unsubscribe();
    this.signUpSub && this.signUpSub.unsubscribe();
  }
}
