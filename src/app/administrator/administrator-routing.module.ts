import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptRenterComponent } from './accept-renter/accept-renter.component';

const routes: Routes = [
  {
    path: 'admin',
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

// canActivate: [LoggedInAdminGuard],
// TODO pour quand la connexion admin sera réalisé
