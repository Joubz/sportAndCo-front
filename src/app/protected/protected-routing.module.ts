import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import {PaymentComponent} from "./payment/payment.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";

const routes: Routes = [
  {
    path: 'equipment',
    children: [
      {
        path: 'equipment-details/:id/:startDate/:endDate',
        component: EquipmentDetailsComponent
      },
      {
        path: 'reservation',
        component: ReservationComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule {}
