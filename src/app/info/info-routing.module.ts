import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {HelpComponent} from './help/help.component';
import {CompanyInfoComponent} from './complany-info/company-info.component';

/**
 * Info module routes.
 */
const infoRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'company-info', component: CompanyInfoComponent },
      { path: 'help', component: HelpComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms-of-service', component: TermsOfServiceComponent },
    ],
  },
];

/**
 * Info routing module class.
 */
@NgModule({
  imports: [
    RouterModule.forChild(infoRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class InfoRoutingModule {}
