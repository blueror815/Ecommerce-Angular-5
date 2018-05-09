import {Locale} from '../app/i18n/locale';

/**
 * Environment vars interface.
 */
export interface EnvironmentInterface {
  /**
   * Whether the app in running in production mode (enableProdMode()).
   */
  production: boolean;

  /**
   * An absolute URL to the API-server.
   */
  apiServerBaseUrl: string;

  /**
   * Timeout for th API-server responses.
   */
  apiServerTimeout: number;

  /**
   * Default app locale.
   */
  defaultLocale: Locale;

  /**
   * ReCaptcha site key.
   */
  reCaptchaSiteKey: string;

  /**
   * An absolute URL to the Rakuten item description server.
   * Used on the product detail page (in iframe).
   */
  iframeBaseUrl: string;
}
