import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ContactUsComponent} from './contact-us/contact-us.component';
import {CompanyInfoComponent} from './complany-info/company-info.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import {HelpComponent} from './help/help.component';
import {PrivacyPolicyEn} from './privacy-policy/en/privacy-policy.en';
import {PrivacyPolicyJa} from './privacy-policy/ja/privacy-policy.ja';
import {PrivacyPolicyRu} from './privacy-policy/ru/privacy-policy.ru';
import {PrivacyPolicyUk} from './privacy-policy/uk/privacy-policy.uk';
import {TermsOfServiceEn} from './terms-of-service/en/terms-of-service.en';
import {TermsOfServiceJa} from './terms-of-service/ja/terms-of-service.ja';
import {TermsOfServiceRu} from './terms-of-service/ru/terms-of-service.ru';
import {TermsOfServiceUk} from './terms-of-service/uk/terms-of-service.uk';
import {CompanyInfoEn} from './complany-info/en/company-info.en';
import {CompanyInfoJa} from './complany-info/ja/company-info.ja';
import {CompanyInfoRu} from './complany-info/ru/company-info.ru';
import {CompanyInfoUk} from './complany-info/uk/company-info.uk';
import {FaqEn} from './faq/en/faq.en';
import {FaqJa} from './faq/ja/faq.ja';
import {FaqRu} from './faq/ru/faq.ru';
import {FaqUk} from './faq/uk/faq.uk';
import {FeedbackService} from './feedback.service';
import {HelpersModule} from '../helpers/helpers.module';
import {RecaptchaComponent} from './recaptcha/recaptcha.component';
import {InfoRoutingModule} from './info-routing.module';

/**
 * Info module class.
 * The module is loaded via lazy loading.
 */
@NgModule({
  declarations: [
    CompanyInfoComponent,
    CompanyInfoEn,
    CompanyInfoJa,
    CompanyInfoRu,
    CompanyInfoUk,
    ContactUsComponent,
    FaqEn,
    FaqJa,
    FaqRu,
    FaqUk,
    HelpComponent,
    PrivacyPolicyComponent,
    PrivacyPolicyEn,
    PrivacyPolicyJa,
    PrivacyPolicyRu,
    PrivacyPolicyUk,
    RecaptchaComponent,
    TermsOfServiceComponent,
    TermsOfServiceEn,
    TermsOfServiceJa,
    TermsOfServiceRu,
    TermsOfServiceUk,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HelpersModule,
    InfoRoutingModule,
  ],
  providers: [
    FeedbackService,
  ],
})
export class InfoModule {}
