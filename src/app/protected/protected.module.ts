import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import { DatepickerModule } from 'ng2-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListClientOrderComponent } from './list-client-order/list-client-order.component';

/**
 * Gestion des modules et composants de Protected
 */
@NgModule({
  declarations: [EquipmentDetailsComponent, ListClientOrderComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    DatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProtectedModule {}
