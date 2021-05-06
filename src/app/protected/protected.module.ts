import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ExempleComponentComponent } from './exemple-component/exemple-component.component';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';
import {DatepickerModule} from "ng2-datepicker";



/**
 * Gestion des modules et composants de Protected
 */
@NgModule({
  declarations: [ExempleComponentComponent, EquipmentDetailsComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    DatepickerModule
  ]
})
export class ProtectedModule { }
