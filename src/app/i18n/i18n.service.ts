import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {Messages} from './messages/messages';
import {Category} from '../interfaces/category';
import {Locale} from './locale';
import {Country} from '../interfaces/country';
import {Translations} from './translations';

import {environment} from '../../environments/environment';
import english from './messages/english';
import ukrainian from './messages/ukrainian';
import japanese from './messages/japanese';
import russian from './messages/russian';
import categoriesUk from './categories/categories.uk';
import categoriesEn from './categories/categories.en';
import categoriesRu from './categories/categories.ru';
import categoriesJa from './categories/categories.ja';
import countriesEn from './countries/countries.en';
import countriesUk from './countries/countries.uk';
import countriesRu from './countries/countries.ru';
import countriesJa from './countries/countries.ja';
import {CookieService} from '../services/cookie.service';
import {SocialLink} from './social-links/social-link';
import socialLinksEn from './social-links/social-links.en';
import socialLinksJa from './social-links/social-links.ja';
import socialLinksUk from './social-links/social-links.uk';
import socialLinksRu from './social-links/social-links.ru';

/**
 * I18N service class.
 */
@Injectable()
export class I18nService {
  /**
   * Default app locale (pre-initialized).
   * @type {Locale}
   */
  private defaultLocale = CookieService.getCookie('lang') as Locale ||
    environment.defaultLocale;

  // Locale subjects.
  private localeSubject: BehaviorSubject<Locale> = new BehaviorSubject(this.defaultLocale);
  private translationsSubject: ReplaySubject<Translations> = new ReplaySubject(1);

  constructor() {
    // init & refresh locale
    this.localeSubject.subscribe(
      locale => {
        this.refreshTranslations(locale);
      },
    );
  }

  /**
   * Updates an app locale.
   * @param {Locale} newLocale
   */
  public set locale(newLocale: Locale) {
    this.defaultLocale = newLocale;
    CookieService.changeCookie('lang', newLocale);
    this.localeSubject.next(newLocale);
  }

  /**
   * Gets translations object due to current app locale (event).
   * @return {Observable<Translations>}
   */
  public get translations$(): Observable<Translations> {
    return this.translationsSubject.asObservable();
  }

  /**
   * Returns translations object due to default app locale.
   * @return {Translations}
   */
  public get defaultTranslations(): Translations {
    return I18nService.getTranslationsOfLocale(this.defaultLocale);
  }

  /**
   * Composes translations object for a locale.
   * @param {Locale} locale
   * @return {Translations}
   */
  private static getTranslationsOfLocale(locale: Locale): Translations {
    let categories: Category[];
    let countries: Country[];
    let messages: Messages;
    let socialLinks: SocialLink[];
    switch (locale) {
      case Locale.EN: {
        categories = categoriesEn;
        countries = countriesEn;
        messages = english;
        socialLinks = socialLinksEn;
        break;
      }
      case Locale.JA: {
        categories = categoriesJa;
        countries = countriesJa;
        messages = japanese;
        socialLinks = socialLinksJa;
        break;
      }
      case Locale.UK: {
        categories = categoriesUk;
        countries = countriesUk;
        messages = ukrainian;
        socialLinks = socialLinksUk;
        break;
      }
      default: {
        categories = categoriesRu;
        countries = countriesRu;
        messages = russian;
        socialLinks = socialLinksRu;
      }
    }
    return { categories, countries, locale, messages, socialLinks };
  }

  /**
   * Updates the translations object for new app locale
   * and emits translations change event.
   * @param {Locale} locale new app locale
   */
  private refreshTranslations(locale: Locale) {
    const translations = I18nService.getTranslationsOfLocale(locale);
    this.translationsSubject.next(translations);
  }
}
