import {Category} from '../interfaces/category';
import {Country} from '../interfaces/country';
import {Messages} from './messages/messages';
import {Locale} from './locale';
import {SocialLink} from './social-links/social-link';

/**
 * Translations object declaration.
 * Includes current app locale and due to the locale contains
 * category names, country names and messages.
 * Also due to current locale, determines social links in footer.
 */
export interface Translations {
  categories: Category[];
  countries: Country[];
  locale: Locale;
  messages: Messages;
  socialLinks: SocialLink[];
}
