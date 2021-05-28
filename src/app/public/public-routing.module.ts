import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import {LoginRenterComponent} from './login-renter/login-renter.component';
import {ClientRegistrationComponent} from "./client-registration/client-registration.component";
import {ClientLoginComponent} from "./client-login/client-login.component";
import { LoginAdminComponent } from './login-admin/login-admin.component';
import {RenterRegistrationComponent} from "./renter-registration/renter-registration.component";

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
    path: 'login-renter',
    component: LoginRenterComponent
  },
  {
    path: 'client-registration',
    component: ClientRegistrationComponent
  },
  {
    path: 'renter-registration',
    component: RenterRegistrationComponent
  },
  {
    path: 'client-login',
    component: ClientLoginComponent
  },
  {
    path: 'login-admin',
    component: LoginAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
