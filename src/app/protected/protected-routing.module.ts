import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExempleComponentComponent } from './exemple-component/exemple-component.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import {ListEquipmentComponent} from "./list-equipment/list-equipment.component";

const routes: Routes = [
  {
    path: 'exempleProtected',
    component: ExempleComponentComponent
  },
  {
    path: 'equipment',
    children: [
      {
        path: 'equipment-details/:id',
        component: EquipmentDetailsComponent
      },
      {
        path: 'getListEquipment',
        component: ListEquipmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }


