import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import {ListEquipmentComponent} from "./list-equipment/list-equipment.component";
import {EquipmentSearchGuard} from "../core/guards/equipment-search.guard";

const routes: Routes = [
  {
    path: 'equipment',
    canActivateChild: [EquipmentSearchGuard],
    canDeactivate: [EquipmentSearchGuard],
    children: [
      {
        path: 'equipment-list/:equipmentName/:startDate/:endDate/:categoryId/:metropolisesId',
        component: ListEquipmentComponent
      },
      {
        path: 'equipment-details/:id/:startDate/:endDate',
        component: EquipmentDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }


