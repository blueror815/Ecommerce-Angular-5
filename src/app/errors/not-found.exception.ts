import {AbstractError} from './abstract-error';

/**
 * NotFound (404) exception.
 */
export class NotFoundException extends AbstractError {
  name = 'NotFoundException';
}
