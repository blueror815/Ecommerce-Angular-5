import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {Messages} from '../../../i18n/messages/messages';
import {I18nService} from '../../../i18n/i18n.service';
import {RouteHistoryService} from '../../../services/route-history.service';
import {ProductService} from '../../../services/product.service';
import {UtilsService} from '../../../services/utils.service';
import {Locale} from '../../../i18n/locale';

/**
 * Global jQuery object declaration.
 */
declare const jQuery: any;

/**
 * Header search bar component.
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.template.html',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  /**
   * Search keywords.
   */
  keywords: string;

  /**
   * Keywords history service subscription.
   */
  private keywordsSub: Subscription;

  /**
   * Search by keywords service subscription.
   */
  private productsSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private history: RouteHistoryService,
    private i18n: I18nService,
    private productService: ProductService,
    private router: Router,
    private utils: UtilsService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => this.messages = t.messages,
    );
    this.keywordsSub = this.history.keywords$.subscribe(
      keywords => {
        if (keywords && this.keywords !== keywords) {
          this.keywords = keywords;
          this.search();
        }
      },
    );
  }

  /**
   * Sends search by keywords request to server.
   */
  private search(): void {
    this.productsSub = this.productService.searchByKeywords(this.keywords)
      .subscribe(
        this.productService.transmitProducts.bind(this.productService),
        this.utils.handleComponentError.bind(this.utils),
      );
  }

  /**
   * Header search form onSubmit event handler.
   */
  onSubmit() {
    if (this.keywords) {
      jQuery('#navbarCollapse').collapse('hide');
      this.search();
      this.history.keywords = this.keywords;
      this.router.navigate([`/${this.locale}/product/search`, this.keywords]);
    }
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.keywordsSub.unsubscribe();
    this.productsSub && this.productsSub.unsubscribe();
  }
}
