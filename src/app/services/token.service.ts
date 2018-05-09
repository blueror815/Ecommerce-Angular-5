import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

/**
 * Token service.
 * Used for storing and managing authorization token in local storage.
 */
@Injectable()
export class TokenService {
  /**
   * Authorization token storage key.
   * @type {string}
   */
  private readonly tokenKey = 'authToken';

  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Stores an authorization token.
   * @param {string} token new auth token
   */
  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves currently stored authorization token.
   * If no token is stored returns null.
   * @return {string}
   */
  getToken(): string {
    return this.localStorageService.getItem(this.tokenKey) || null;
  }

  /**
   * Clears currently stored authorization token.
   */
  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }
}
