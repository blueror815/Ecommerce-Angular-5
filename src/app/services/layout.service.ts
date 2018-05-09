import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Layout service.
 * Used for switching between layouts (main and checkout).
 */
@Injectable()
export class LayoutService {
  /**
   * Layout subject. Used for emitting events of layout change.
   * @type {BehaviorSubject<boolean>}
   */
  private layoutSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * Return true if a page currently has a main layout (with header and footer).
   * If it is checkout layout, false is returned.
   * @return {Observable<boolean>}
   */
  get isMainLayout$() {
    return this.layoutSubject.asObservable();
  }

  /**
   * Sets the page layout.
   * @param {boolean} value true for main layout, false for checkout layout
   */
  set isMainLayout(value: boolean) {
    this.layoutSubject.next(value);
  }
}
