import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../../i18n/i18n.service';
import {SocialLink} from '../../../i18n/social-links/social-link';
import {SocialMedium} from '../../../i18n/social-links/social-medium';

/**
 * Social links component class.
 * Renders appropriate social links in footer due to current app locale.
 */
@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.template.html',
})
export class SocialLinksComponent implements OnInit, OnDestroy {
  // I18N
  socialLinks: SocialLink[] = this.i18n.defaultTranslations.socialLinks;
  tSub: Subscription;

  constructor(private i18n: I18nService) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.tSub = this.i18n.translations$.subscribe(
      t => this.socialLinks = t.socialLinks,
    );
  }

  /**
   * Sets corresponding Font Awesome class to a footer link icon
   * due to its social medium type.
   * @param {SocialMedium} medium social medium type
   * @return {any}
   */
  getFaClass(medium: SocialMedium) {
    switch (medium) {
      case SocialMedium.Twitter: return 'fa-twitter';
      case SocialMedium.Facebook: return 'fa-facebook-square';
      case SocialMedium.Vk: return 'fa-vk';
      case SocialMedium.Instagram: return 'fa-instagram';
      default: return 'fa-users';
    }
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.tSub.unsubscribe();
  }

}
