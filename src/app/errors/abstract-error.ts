/**
 * Class implementing built-in Error.
 */
export abstract class AbstractError implements Error {
  public abstract name: string;
  public message: string;

  constructor(message?: string) {
    message && (this.message = message);
  }
}
