import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import {ClientRegistrationComponent} from "./client-registration/client-registration.component";
import {ClientLoginComponent} from "./client-login/client-login.component";
import { RenterRegistrationComponent } from './renter-registration/renter-registration.component';
import { RenterLoginComponent } from './renter-login/renter-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent
  },
  {
    path: 'client-registration',
    component: ClientRegistrationComponent
  },
  {
    path: 'client-login',
    component: ClientLoginComponent
  },
  {
    path: 'renter-registration',
    component: RenterRegistrationComponent
  },
  {
    path: 'renter-login',
    component: RenterLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
