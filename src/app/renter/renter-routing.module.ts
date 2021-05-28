import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEquipmentComponent } from './create-equipment/create-equipment.component';
import {LoggedInRenterGuard} from "../core/guards/logged-in-renter.guard";

const routes: Routes = [
  {
    path: 'renter',
    canActivate: [LoggedInRenterGuard],
    children: [
      {
        path: 'create-equipment',
        component: CreateEquipmentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenterRoutingModule { }
