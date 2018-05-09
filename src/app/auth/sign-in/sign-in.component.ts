import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../../services/auth.service';
import {AuthChecker} from '../../helpers/auth-checker';
import {RouteHistoryService} from '../../services/route-history.service';
import {UtilsService} from '../../services/utils.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';

/**
 * Sign in component class.
 */
@Component({
  templateUrl: './sign-in.template.html',
})
export class SignInComponent implements OnInit, OnDestroy {
  // Authorization checking
  authChecker: AuthChecker;
  private sub1: Subscription;
  private successRedirectRoute: string;

  /**
   * Sign in service subscription.
   */
  private signInSub: Subscription;

  // Flags
  isAuthInvalid = false;
  isFormPending = false;

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
    private history: RouteHistoryService,
    private i18n: I18nService,
    private router: Router,
    private title: Title,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.refreshRedirectRoute(this.successRedirectRoute);
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
    this.history.previousPath$.subscribe(
      this.refreshRedirectRoute.bind(this),
    );
  }

  /**
   * Updates redirect route on successful login.
   * @param {string} route new redirect route
   */
  private refreshRedirectRoute(route: string) {
    if (!route) {
      this.successRedirectRoute = `/${this.locale}`;
    } else {
      const pathRest = route.substr(4);
      this.successRedirectRoute =
        !!pathRest ? `/${this.locale}/${pathRest}` : `/${this.locale}`;
    }
  }

  /**
   * Sets current page title.
   */
  private setTitle() {
    this.title.setTitle(
      `${this.messages.common.misona} -
      ${this.messages.auth.login}`
    );
  }

  /**
   * OnSubmit event handler.
   */
  onSubmit() {
    if (
      this.password.length < 4 ||
      !this.password.match(/^[\x21-\x7e]+$/)
    ) {
      this.isAuthInvalid = true;
    } else {
      this.isFormPending = true;
      this.signInSub = this.authService.signIn(this.email, this.password)
        .subscribe(
          isSuccess => {
            this.isFormPending = false;
            if (!isSuccess) {
              this.isAuthInvalid = true;
            } else {
              return this.router.navigateByUrl(this.successRedirectRoute);
            }
          },
          this.utils.handleComponentError.bind(this.utils),
        );
    }
  }

  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.sub1.unsubscribe();
    this.authChecker.unsubscribe();
    this.signInSub && this.signInSub.unsubscribe();
  }
}
