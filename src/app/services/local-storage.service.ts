import {Injectable} from '@angular/core';

/**
 * Local storage implementing service.
 */
@Injectable()
export class LocalStorageService implements Storage {
  /**
   * @inheritDoc
   */
  public readonly length: number;

  /**
   * Browser localStorage object.
   * @type {Storage}
   */
  private storage = localStorage;

  constructor() {
    this.length = this.storage.length;
  }

  /**
   * @inheritDoc
   */
  public clear(): void {
    this.storage.clear();
  }

  /**
   * @inheritDoc
   */
  public getItem(key: string): string|null {
    return this.storage.getItem(key);
  }

  /**
   * @inheritDoc
   */
  public key(index: number): string|null {
    return this.storage.key(index);
  }

  /**
   * @inheritDoc
   */
  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * @inheritDoc
   */
  public setItem(key: string, data: string): void {
    this.storage.setItem(key, data);
  }

  /**
   * @inheritDoc
   */
  [key: string]: any;
  [index: number]: string;
}
