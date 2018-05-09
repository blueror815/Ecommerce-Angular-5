import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../../../services/auth.service';
import {UtilsService} from '../../../services/utils.service';
import {I18nService} from '../../../i18n/i18n.service';
import {Messages} from '../../../i18n/messages/messages';
import {Locale} from '../../../i18n/locale';
import {SignOutService} from '../../../services/sign-out.service';

/**
 * Header auth links component class.
 */
@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.template.html',
})
export class AuthLinksComponent implements OnInit, OnDestroy {
  /**
   * "Pending" flag.
   */
  pending: boolean;

  /**
   * Full name of currenty authenticated user (if any).
   */
  fullName: string;

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

    this.pending = true;
    this.userDataSub = this.authService.userData$.subscribe(
      userData => {
        this.fullName = userData ? userData.fullName : null;
        this.pending = false;
      },
      err => {
        this.pending = false;
        this.utils.handleComponentError(err);
      },
    );
  }

  /**
   * "Logout" link onClick event handler.
   * Signs user out.
   */
  logout() {
    this.signOutService.signOut();
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }
}
