import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';

import {RouteHistoryService} from './services/route-history.service';

/**
 * App component class.
 */
@Component({
  selector: 'app-root',
  template: `
    <app-cart-modal></app-cart-modal>
    <app-header></app-header>
    <main class="container py-4 py-lg-5">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  // These styles attach footer to page bottom.
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-around;
    }
  `],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private routeHistoryService: RouteHistoryService,
  ) {}

  ngOnInit() {
    // registering current routing path
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.routeHistoryService.currentPath = event.url;
      });
  }

}
