import {AbstractError} from './abstract-error';

/**
 * Unauthorized (401) exception.
 */
export class UnauthorizedException extends AbstractError {
  name = 'UnauthorizedException';
}
