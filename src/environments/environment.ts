// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {EnvironmentInterface} from './environment.interface';
import {Locale} from '../app/i18n/locale';

/**
 * @see environment.interface.ts
 */
export const environment: EnvironmentInterface = {
  production: false,
  apiServerBaseUrl: 'http://localhost:3005',
  apiServerTimeout: 7000,  // 7 seconds
  defaultLocale: Locale.EN,
  reCaptchaSiteKey: '6LdkTT4UAAAAAGW4TK9cm-TTZ3gwfF2mdY3KQZbK',
  iframeBaseUrl: 'http://localhost:8443/descr',
};
