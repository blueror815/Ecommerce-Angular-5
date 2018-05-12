import {EnvironmentInterface} from './environment.interface';
import {Locale} from '../app/i18n/locale';

/**
 * @see environment.interface.ts
 */
export const environment: EnvironmentInterface = {
  production: true,
  apiServerBaseUrl: 'https://api.com',
  apiServerTimeout: 10000, // 10 seconds
  defaultLocale: Locale.RU,
  reCaptchaSiteKey: 'example',
  iframeBaseUrl: 'https://api.com/descr',
};
