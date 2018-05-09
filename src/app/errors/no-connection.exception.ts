import {AbstractError} from './abstract-error';

/**
 * No connection client exception.
 */
export class NoConnectionException extends AbstractError {
  name = 'NoConnectionException';
}
