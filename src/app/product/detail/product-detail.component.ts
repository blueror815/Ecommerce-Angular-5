import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {ProductService} from '../../services/product.service';
import {Product} from '../../interfaces/product';
import {CartService} from '../../services/cart.service';
import {UtilsService} from '../../services/utils.service';
import {NotFoundException} from '../../errors/not-found.exception';
import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Locale} from '../../i18n/locale';
import {Category} from '../../interfaces/category';

import {environment} from '../../../environments/environment';

/**
 * Global jQuery object declaration.
 */
declare const jQuery: any;

/**
 * Product detail component. Implements a product detail view.
 */
@Component({
  templateUrl: './product-detail.template.html',
  styles: [`
    iframe {
      width: 100%;
      border: none;
    }
  `],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  /**
   * Target product
   */
  product: Product;

  /**
   * Target product ID.
   */
  productId: string;

  /**
   * Target product description.
   */
  description: string;

  /**
   * Flag indicating whether the description is expanded (i.e. shown).
   * @type {boolean}
   */
  descriptionShown = false;

  /**
   * URL to currently selected product image.
   */
  mainImageSrc: string;

  /**
   * URL to product description server (to open in iframe).
   * @type {SafeResourceUrl}
   */
  iframeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');

  private sub: Subscription;

  // Product image swiping.
  private x: number;
  private y: number;
  private isSwipeLocked = false;

  // I18N
  locale: Locale = this.i18n.defaultTranslations.locale;
  categories: Category[] = this.i18n.defaultTranslations.categories;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private cartService: CartService,
    private i18n: I18nService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private title: Title,
    private utilsService: UtilsService,
    private sanitizer: DomSanitizer,
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
        this.setTitle();
        //this.setDescription();
      },
    );

    this.setTitle();
    this.productId = this.route.snapshot.params.id;

    this.sub = this.productService.getProduct(this.productId).subscribe(
      product => {
        if (!product) {
          throw new NotFoundException();
        } else {
          this.product = product;
          //this.setDescription();
          this.mainImageSrc = this.product.imageUrls[0];
          this.setTitle();
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            environment.iframeBaseUrl + '/' + product.id + '/' + this.locale);
        }
      },
      this.utilsService.handleComponentError.bind(this.utilsService),
    );
  }

  /**
   * Gets category name due to current app locale.
   * @param {number} id category ID
   * @return {string}
   */
  getCategory(id: number): string {
    const category = this.categories.find(x => x.id === id);
    if (category) {
      return category.name;
    } else {
      return id.toString();
    }
  }

  /**
   * Iframe onLoad event handler.
   * Automatically resizes product description iframe.
   */
  onIframeLoad() {
    jQuery('#idIframe').iFrameResize({ checkOrigin: false });
  }

  /*setDescription() {
    if (this.product) {
      if (this.locale === Locale.JA) {
        this.description = this.product.description;
      } else {
        this.productService.translateDescription(
          this.product.description, this.locale
        ).subscribe(
          text => this.description = text,
          err => this.description = this.product.description,
        );
      }
    }
  }*/

  /**
   * Sets current page title.
   */
  private setTitle() {
    let title = `${this.messages.common.misona}`;
    if (this.product) {
      title += ` - ${this.product.title}`;
    }
    this.title.setTitle(title);
  }

  /**
   * Main image onTouchStart event handler.
   * @param $event
   */
  onTouchStart($event) {
    this.x = $event.touches[0].clientX;
    this.y = $event.touches[0].clientY;
  }

  /**
   * Main image onTouchMove event handler.
   * @param $event
   */
  onTouchMove($event) {
    const dx = $event.touches[0].clientX - this.x;
    const dy = $event.touches[0].clientY - this.y;
    if (!this.isSwipeLocked && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        // swipe right
        this.previousImage();
      } else {
        // swipe left
        this.nextImage();
      }
      this.isSwipeLocked = true;
    }
  }

  /**
   * Main image onTouchEnd event handler.
   * @param $event
   */
  onTouchEnd() {
    this.isSwipeLocked = false;
  }

  /**
   * Returns previous product image (used for image swiping).
   */
  private previousImage() {
    const imageUrls = this.product.imageUrls;
    const index = imageUrls.indexOf(this.mainImageSrc);
    if (index === 0) {
      this.mainImageSrc = imageUrls[imageUrls.length - 1];
    } else {
      this.mainImageSrc = imageUrls[index - 1];
    }
  }

  /**
   * Returns next product image (used for image swiping).
   */
  private nextImage() {
    const imageUrls = this.product.imageUrls;
    const index = imageUrls.indexOf(this.mainImageSrc);
    if (index === imageUrls.length - 1) {
      this.mainImageSrc = imageUrls[0];
    } else {
      this.mainImageSrc = imageUrls[index + 1];
    }
  }

  /**
   * Expands product description.
   */
  showDescription(): void {
    this.descriptionShown = true;
  }

  /**
   * Updates main product image.
   * @param {string} src
   */
  changeMainImage(src: string) {
    this.mainImageSrc = src;
  }

  /**
   * "Add to cart" button onClick event handler.
   */
  addToCart(): void {
    try {
      this.cartService.addItem(this.product);
      jQuery('#cartModal').modal('show');
    } catch (err) {
      this.utilsService.handleComponentError.bind(this.utilsService);
    }
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
    this.sub.unsubscribe();
  }
}
