import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';
import {RouteHistoryService} from '../../services/route-history.service';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Title} from '@angular/platform-browser';

/**
 * Search by keywords component class.
 */
@Component({
  templateUrl: './search-by-keywords.template.html',
})
export class SearchByKeywordsComponent implements OnInit, OnDestroy {
  /**
   * Current search keywords.
   */
  keywords: string;

  /**
   * Keywords history service subscription.
   */
  private keywordsSub: Subscription;

  /**
   * Found products.
   */
  products$: Observable<Product[]>;

  // I18N
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private history: RouteHistoryService,
    private i18n: I18nService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private title: Title,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.messages = t.messages;
        this.setTitle();
      },
    );

    this.setTitle();

    this.keywords = this.route.snapshot.params.keywords;
    this.history.keywords = this.keywords;
    this.keywordsSub = this.history.keywords$.subscribe(
      keywords => {
        this.keywords = keywords;
        this.setTitle();
      },
    );
    this.products$ = this.productService.products$;
  }

  /**
   * Sets current page title.
   */
  private setTitle() {
    let title = `${this.messages.common.misona}`;
    if (this.keywords) {
      title += ` - "${this.keywords}"`;
    }
    this.title.setTitle(title);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.keywordsSub.unsubscribe();
  }
}
