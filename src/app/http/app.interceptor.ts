import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import {TimeoutError} from 'rxjs/util/TimeoutError';

import {TokenService} from '../services/token.service';
import {FatalError} from '../errors/fatal-error';
import {ConflictException} from '../errors/conflict.exception';
import {NotFoundException} from '../errors/not-found.exception';
import {UnauthorizedException} from '../errors/unauthorized.exception';
import {NoConnectionException} from '../errors/no-connection.exception';
import {TimeoutException} from '../errors/timeout.exception';

import {environment} from '../../environments/environment';

/**
 * App HTTP interceptor class.
 */
@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    // getting stored token
    const token = this.tokenService.getToken();
    // composing Bearer auth header
    const authHeader = token ? `Bearer ${token}` : null;
    // init "update"
    const newUrl = `${environment.apiServerBaseUrl}${req.url}`;
    const update: any = { url: newUrl };
    // applying the auth header
    if (authHeader) {
      update.setHeaders = { Authorization: authHeader };
    }
    // cloning the request
    const clonedReq = req.clone(update);
    // sending cloned request & handling timeout
    return next.handle(clonedReq).timeout(environment.apiServerTimeout)
      .catch(AppInterceptor.handleHttpError);
  }

  /**
   * Handles HTTP error of the API server.
   * @param {HttpErrorResponse} err
   * @return {never}
   */
  private static handleHttpError(err: HttpErrorResponse): never {
    if (err instanceof TimeoutError) {
      throw new TimeoutException(err.message);
    } else {
      switch (err.status) {
        case 0: throw new NoConnectionException(err.message);
        case 401: throw new UnauthorizedException(err.message);
        case 404: throw new NotFoundException(err.message);
        case 409: throw new ConflictException(err.message);
        default: {
          const fatalError = new FatalError();
          if (err.message) {
            fatalError.message = err.message;
          }
          throw fatalError;
        }
      }
    }
  }

}
