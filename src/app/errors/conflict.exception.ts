import {AbstractError} from './abstract-error';

/**
 * Conflict (409) Exception.
 */
export class ConflictException extends AbstractError {
  name = 'ConflictException';
}
