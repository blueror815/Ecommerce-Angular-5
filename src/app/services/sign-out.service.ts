import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {OrderService} from './order.service';

/**
 * Sign out service.
 * Used for proper user session closing.
 */
@Injectable()
export class SignOutService {

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  /**
   * Signs user out, clears all corresponding data stored in browser.
   */
  public signOut(): void {
    this.orderService.removeDeliveryData();
    this.authService.signOut();
  }

}
