import {CurrencyCode} from './currency-code';

/**
 * Currency type declaration.
 */
export interface Currency {
  code: CurrencyCode,
  rate: number,
}
