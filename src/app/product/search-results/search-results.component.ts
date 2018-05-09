import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {Product} from '../../interfaces/product';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {UtilsService} from '../../services/utils.service';
import {Locale} from '../../i18n/locale';
import {Category} from '../../interfaces/category';

/**
 * Product search results component.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.template.html',
  styleUrls: ['../../styles/img-square.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  /**
   * Target products (async, input).
   */
  @Input() products$: Observable<Product[]>;

  /**
   * All products (sync).
   */
  products: Product[];

  /**
   * Diplayed products.
   */
  displayProducts: Product[];

  /**
   * Products by page.
   * @type {number}
   */
  private readonly pageCount = 24;

  /**
   * All pages.
   * @type {Array}
   */
  pages: number[] = [];

  /**
   * Current page number;
   * @type {number}
   */
  currentPage = 1;

  /**
   * Products service subscription.
   */
  private productsSub: Subscription;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  categories: Category[] = this.i18n.defaultTranslations.categories;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private i18n: I18nService,
    private utils: UtilsService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.locale = t.locale;
        this.categories = t.categories;
        this.messages = t.messages;
      },
    );
    this.productsSub = this.products$.subscribe(
      this.initProducts.bind(this),
      this.utils.handleComponentError.bind(this.utils),
    );
  }

  /**
   * Gets category name due to current app locale.
   * @param {number} id
   * @return {string}
   */
  getCategory(id: number): string {
    const category = this.categories.find(x => x.id === id);
    if (category) {
      return `${category.name}: `;
    } else {
      return `${id}: `;
    }
  }

  /**
   * Initializes current products.
   * @param {Product[]} products
   */
  private initProducts(products: Product[]): void {
    this.products = products;
    if (this.products) {
      const numPages = Math.ceil(this.products.length / this.pageCount);
      this.pages = [];
      for (let i = 1; i <= numPages; i++) {
        this.pages.push(i);
      }
      this.renderProducts(1);
    }
  }

  /**
   * Displays products of a page.
   * @param {number} page page number
   */
  renderProducts(page: number): void {
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.pageCount;
    const end = start + this.pageCount;
    this.displayProducts = this.products.slice(start, end);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.productsSub && this.productsSub.unsubscribe();
  }
}
