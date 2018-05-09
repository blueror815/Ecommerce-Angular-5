import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {I18nService} from '../../i18n/i18n.service';
import {Messages} from '../../i18n/messages/messages';
import {Country} from '../../interfaces/country';
import {CountryService} from './country.service';

/**
 * Select country component.
 */
@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.template.html',
  styleUrls: ['../select.styles.css'],
})
export class SelectCountryComponent implements OnInit, OnDestroy {
  /**
   * Current country code.
   */
  countryCode: string;

  /**
   * Current country service subscription.
   */
  private countrySub: Subscription;

  // I18N
  countries: Country[] = this.i18n.defaultTranslations.countries;
  messages: Messages = this.i18n.defaultTranslations.messages;
  private tSub: Subscription;

  constructor(
    private countryService: CountryService,
    private i18n: I18nService,
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.countrySub = this.countryService.countryCode$.subscribe(
      code => this.countryCode = code,
    );
    this.tSub = this.i18n.translations$.subscribe(
      t => {
        this.countries = t.countries;
        this.messages = t.messages;
      },
    );
  }

  /**
   * Country dropdown list onChange event emitter.
   * Updates current country.
   */
  onChange() {
    this.countryService.countryCode = this.countryCode;
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    this.countrySub.unsubscribe();
    this.tSub.unsubscribe();
  }
}
