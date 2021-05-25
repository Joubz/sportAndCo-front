import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoggedInAdminGuard} from "../core/guards/logged-in-admin.guard";

import { AcceptRenterComponent } from './accept-renter/accept-renter.component';


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [LoggedInAdminGuard],
    children: [
      {
        path: 'accept-renter',
        component: AcceptRenterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
