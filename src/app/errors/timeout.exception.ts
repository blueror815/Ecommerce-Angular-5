import {AbstractError} from './abstract-error';

/**
 * Timeout client exception.
 */
export class TimeoutException extends AbstractError {
  name = 'TimeoutException';
}
