import {AbstractError} from './abstract-error';

/**
 * Fatal error client exception.
 */
export class FatalError extends AbstractError {
  name = 'FatalError';
}
