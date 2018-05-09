import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {TimeoutException} from '../errors/timeout.exception';
import {NoConnectionException} from '../errors/no-connection.exception';
import {UnauthorizedException} from '../errors/unauthorized.exception';
import {NotFoundException} from '../errors/not-found.exception';
import {AbstractError} from '../errors/abstract-error';
import {ExceptionType} from '../errors/exception-type';
import {Locale} from '../i18n/locale';
import {I18nService} from '../i18n/i18n.service';

import {environment} from '../../environments/environment';

/**
 * App utilities service.
 */
@Injectable()
export class UtilsService {
  /**
   * Current app locale.
   * @type {Locale}
   */
  private locale: Locale = this.i18n.defaultTranslations.locale;

  constructor(
    private i18n: I18nService,
    private router: Router,
  ) {}

  /**
   * Catches an AbstractError and redirects to appropriate page.
   * @param {AbstractError} err
   */
  public handleComponentError(err: AbstractError): void {
    if (!environment.production) {
      // logging
      console.error(err);
    }
    if (err instanceof NoConnectionException) {
      this.router.navigate([`/${this.locale}/error`, ExceptionType.NoConnection],
        { skipLocationChange: true });
    } else if (err instanceof TimeoutException) {
      this.router.navigate([`/${this.locale}/error`, ExceptionType.Timeout],
        { skipLocationChange: true });
    } else if (err instanceof UnauthorizedException) {
      this.router.navigate([`/${this.locale}/auth/sign-in`]);
    } else if (err instanceof NotFoundException) {
      this.router.navigate([`/${this.locale}/not-found`],
        { skipLocationChange: true });
    } else {
      this.router.navigate([`/${this.locale}/error`, ExceptionType.FatalError],
        { skipLocationChange: true });
    }
  }
}
