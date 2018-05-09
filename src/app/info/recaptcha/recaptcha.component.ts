import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {environment} from '../../../environments/environment';
import {I18nService} from '../../i18n/i18n.service';
import {FeedbackService} from '../feedback.service';

// Global objects type declarations.
declare const $: any;
declare const grecaptcha: any;
declare global {
  interface Window {
    grecaptcha: any;
    reCaptchaLoad: () => void;
  }
}

/**
 * reCaptcha component class.
 */
@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.template.html',
})
export class RecaptchaComponent implements OnInit, OnDestroy {
  /**
   * ReCaptcha change value event emitter.
   * @type {EventEmitter<any>}
   */
  @Output() value$: EventEmitter<string> = new EventEmitter();

  /**
   * ReCaptcha loaded flag.
   * @type {boolean}
   */
  isRecaptchaLoaded = false;

  // I18N
  locale = this.i18n.defaultTranslations.locale;
  tSub: Subscription;

  /**
   * HasContactSent service subscription.
   */
  contactSentSub: Subscription;

  constructor(
    private feedbackService: FeedbackService,
    private i18n: I18nService,
  ) {}

  /**
   * Inserts reCaptcha script into document body.
   */
  static addScript() {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.registerReCaptchaCallback();
    RecaptchaComponent.addScript();

    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        if (this.isRecaptchaLoaded) {
          this.reloadReCaptcha();
        }
      }
    );

    this.contactSentSub = this.feedbackService.hasContactSent$.subscribe(
      () => this.isRecaptchaLoaded && this.reloadReCaptcha(),
    );
  }

  /**
   * Attaches reCaptcha callback event to window object.
   */
  registerReCaptchaCallback() {
    window.reCaptchaLoad = () => {
      this.reloadReCaptcha();
      this.isRecaptchaLoaded = true;
    };
  }

  /**
   * Re-initializes reCaptcha.
   */
  reloadReCaptcha() {
    const wrapper = document.querySelector('.recaptcha-wrapper');
    const oldContainer = document.querySelector('.recaptcha-container');
    if (oldContainer) {
      oldContainer.parentNode.removeChild(oldContainer);
    }
    const container = document.createElement('div');
    container.setAttribute('class', 'recaptcha-container');
    wrapper.appendChild(container);
    grecaptcha.render(container, {
      sitekey: environment.reCaptchaSiteKey,
      callback: this.reCaptchaCallback.bind(this),
      'expired-callback': this.reCaptchaExpired.bind(this),
      hl: this.locale,
    });
    this.value$.emit(null);
  }

  /**
   * ReCaptcha callback event handler.
   * @param {string} response
   */
  reCaptchaCallback(response: string) {
    this.value$.emit(response);
  }

  /**
   * ReCaptcha expired event handler.
   */
  reCaptchaExpired() {
    this.value$.emit(null);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.contactSentSub.unsubscribe();
    this.tSub.unsubscribe();
  }

}
