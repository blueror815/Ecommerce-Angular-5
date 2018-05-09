import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';

import {AuthService} from '../../services/auth.service';
import {UserData} from '../../interfaces/user-data';
import {FeedbackService} from '../feedback.service';
import {UtilsService} from '../../services/utils.service';

declare const $: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.template.html',
})
export class ContactUsComponent implements OnInit, OnDestroy {
  /**
   * ContactUs message form model.
   */
  message: string;

  /**
   * ContactUs fullName form model (if any).
   */
  fullName: string;

  /**
   * ContactUs email form model (if any).
   */
  email: string;

  /**
   * ContactUs orderNumber form model (if any).
   */
  orderNumber: number;

  /**
   * ContactUs form reCaptcha value (if any).
   */
  reCaptchaValue: string;

  // Flags
  isPending = false;
  isCaptchaFailed = false;
  isSuccess = false;

  /**
   * User data of currently authenticated user (if any).
   */
  userData: UserData;

  /**
   * Authorization service subscription.
   */
  authSub: Subscription;

  // I18N
  locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private auth: AuthService,
    private feedbackService: FeedbackService,
    private i18n: I18nService,
    private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.messages = t.messages;
      },
    );

    this.authSub = this.auth.userData$.subscribe(
      userData => this.userData = userData,
    );
  }

  /**
   * App RecaptchaComponent value$ event handler.
   * @param {string} value
   */
  onCaptchaValue(value: string) {
    this.reCaptchaValue = value;
  }

  /**
   * ContactUs form onSubmit event handler.
   */
  onSubmit() {
    this.isCaptchaFailed = false;
    this.isSuccess = false;
    if (this.userData) {
      const opts = {
        fullName: this.userData.fullName,
        email: this.userData.email,
        orderNumber: this.orderNumber,
        message: this.message,
      };
      this.sendRequest(opts);
    } else {
      const reCaptchaValue = this.reCaptchaValue;
      if (!reCaptchaValue) {
        this.isCaptchaFailed = true;
      } else {
        const opts = {
          fullName: this.fullName,
          email: this.email,
          orderNumber: this.orderNumber,
          message: this.message,
          reCaptchaValue: reCaptchaValue,
        };
        this.sendRequest(opts);
      }
    }
  }

  /**
   * Sends a message from the ContactUs form to back-end.
   * @param opts
   */
  private sendRequest(opts) {
    this.feedbackService.contactUs(opts).subscribe(
      () => {
        this.isPending = false;
        this.fullName = null;
        this.email = null;
        this.orderNumber = null;
        this.message = null;
        this.isSuccess = true;
      },
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.tSub.unsubscribe();
  }
}
