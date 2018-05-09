import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SelectCurrencyComponent} from './currency/select/select-currency.component';
import {NewCurrencyPipe} from './currency/new-currency.pipe';
import {CurrencyService} from './currency/currency.service';
import {SelectLanguageComponent} from './language/select-language.component';
import {SelectCountryComponent} from './country/select-country.component';
import {CountryService} from './country/country.service';

/**
 * Settings module.
 * Implements country, currency and language change functionality.
 */
@NgModule({
  declarations: [
    NewCurrencyPipe,
    SelectCountryComponent,
    SelectCurrencyComponent,
    SelectLanguageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    NewCurrencyPipe,
    SelectCountryComponent,
    SelectCurrencyComponent,
    SelectLanguageComponent,
  ],
  providers: [
    CountryService,
    CurrencyService,
  ],
})
export class SettingsModule {}
