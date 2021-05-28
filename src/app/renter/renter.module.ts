import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RenterRoutingModule } from './renter-routing.module';
import { ProductListRenterComponent } from './product-list-renter/product-list-renter.component';
import { CreateEquipmentComponent } from './create-equipment/create-equipment.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DatepickerModule} from "ng2-datepicker";


/**
 * Gestion des modules et composants de Renter
 */
@NgModule({
  declarations: [
    ProductListRenterComponent,
    CreateEquipmentComponent
  ],
  imports: [
    CommonModule,
    RenterRoutingModule,
    ReactiveFormsModule,
    DatepickerModule
  ]
})
export class RenterModule { }
