import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomAdminComponentComponent } from "./random-admin-component/random-admin-component.component";

const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/anomalies-list'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'exemple',
        component: RandomAdminComponentComponent
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
