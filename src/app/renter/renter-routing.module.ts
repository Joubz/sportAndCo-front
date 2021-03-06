import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListRenterComponent } from './product-list-renter/product-list-renter.component';
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
      {
        path: 'equipment-list',
        component: ProductListRenterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenterRoutingModule { }
