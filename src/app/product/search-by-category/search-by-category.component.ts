import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../i18n/i18n.service';
import {Category} from '../../interfaces/category';
import {ProductService} from '../../services/product.service';
import {Product} from '../../interfaces/product';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';

/**
 * Search by category component class.
 */
@Component({
  templateUrl: './search-by-category.template.html',
})
export class SearchByCategoryComponent implements OnInit, OnDestroy {
  /**
   * Browser window object.
   * @type {Window}
   */
  private readonly window = window;

  /**
   * Product category to search by.
   */
  category: Category;

  /**
   * Found products.
   */
  products$: Observable<Product[]>;

  // I18N
  categories: Category[] = this.i18n.defaultTranslations.categories;
  locale: Locale = this.i18n.defaultTranslations.locale;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private i18n: I18nService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.window.scroll(0, 0);

    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.categories = t.categories;
        this.locale = t.locale;
        this.messages = t.messages;
        this.category = this.categories.find(x => x.id === categoryId);
        this.setTitle();
      },
    );

    this.setTitle();

    const categoryId = +this.route.snapshot.params.id;
    this.category = this.categories.find(x => x.id === categoryId);
    if (!this.category) {
      return this.router.navigate(
        ['/' + this.locale + '/not-found'],
        { skipLocationChange: true },
      );
    } else {
      this.setTitle();
      this.products$ = this.productService.searchByCategory(this.category.id);
    }
  }

  /**
   * Sets current page title.
   */
  private setTitle() {
    let title = `${this.messages.common.misona}`;
    if (this.category) {
      title += ` - ${this.category.name}`;
    }
    this.title.setTitle(title);
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }
}
