import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import {ListClientOrderComponent} from "./list-client-order/list-client-order.component";

const routes: Routes = [
  {
    path: 'equipment',
    children: [
      {
        path: 'equipment-details/:id/:startDate/:endDate',
        component: EquipmentDetailsComponent,
      },
    ],
  },
  {
    path: 'list-client-order',
    component: ListClientOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
