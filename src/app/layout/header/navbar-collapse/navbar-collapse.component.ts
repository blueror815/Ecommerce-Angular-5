import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../../../services/auth.service';
import {UtilsService} from '../../../services/utils.service';
import {I18nService} from '../../../i18n/i18n.service';
import {Messages} from '../../../i18n/messages/messages';
import {Locale} from '../../../i18n/locale';
import {SignOutService} from '../../../services/sign-out.service';

/**
 * Global jQuery object declaration.
 */
declare const $: any;

/**
 * Navbar collapse component.
 * Represents expandable content of header on mobile view.
 */
@Component({
  selector: 'app-navbar-collapse',
  templateUrl: './navbar-collapse.template.html',
  styles: [`
    .nav-link {
      cursor: pointer;
      white-space: nowrap;
    }
  `],
})
export class NavbarCollapseComponent implements OnInit, OnDestroy {
  /**
   * "Is user authenticated" flag.
   * @type {boolean}
   */
  isAuthenticated = false;

  /**
   * Authenticated user data service subscription.
   */
  private userDataSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private authService: AuthService,
    private i18n: I18nService,
    private router: Router,
    private signOutService: SignOutService,
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

    this.userDataSub = this.authService.userData$.subscribe(
      userData => {
        this.isAuthenticated = !!userData;
      },
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * "Home" clink onClick event handler.
   * @return {Promise<boolean>}
   */
  redirectToHomePage() {
    $('#navbarCollapse').collapse('hide');
    return this.router.navigate([`/${this.locale}`]);
  }

  /**
   * "Sin In" clink onClick event handler.
   * @return {Promise<boolean>}
   */
  redirectToSignIn() {
    $('#navbarCollapse').collapse('hide');
    return this.router.navigate([`/${this.locale}/auth/sign-in`]);
  }

  /**
   * "Sin Up" clink onClick event handler.
   * @return {Promise<boolean>}
   */
  redirectToSignUp() {
    $('#navbarCollapse').collapse('hide');
    return this.router.navigate([`/${this.locale}/auth/sign-up`]);
  }

  /**
   * "Account" clink onClick event handler.
   * @return {Promise<boolean>}
   */
  redirectToAccount() {
    $('#navbarCollapse').collapse('hide');
    return this.router.navigate([`/${this.locale}/account`]);
  }

  /**
   * "Log out" clink onClick event handler.
   * @return {Promise<boolean>}
   */
  logout() {
    $('#navbarCollapse').collapse('hide');
    this.signOutService.signOut();
  }

  /**
   * "Help" clink onClick event handler.
   * @return {Promise<boolean>}
   */
  help() {
    $('#navbarCollapse').collapse('hide');
    return this.router.navigate([`/${this.locale}/info/help`]);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }
}
