import {EnvironmentInterface} from './environment.interface';
import {Locale} from '../app/i18n/locale';

/**
 * @see environment.interface.ts
 */
export const environment: EnvironmentInterface = {
  production: true,
  apiServerBaseUrl: 'https://api.misona.jp',
  apiServerTimeout: 10000, // 10 seconds
  defaultLocale: Locale.RU,
  reCaptchaSiteKey: '6LfwAz4UAAAAAK1s2lOknS-Kky6_f71qw6inINxi',
  iframeBaseUrl: 'https://dev.misona.jp:8443/descr',
};
