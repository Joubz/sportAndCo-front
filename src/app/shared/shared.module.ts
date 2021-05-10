import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import {DatepickerModule} from "ng2-datepicker";

/**
 * Gestion des modules et composants de Shared
 */
@NgModule({
  declarations: [
    EquipmentSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule
  ],
    exports: [
        EquipmentSearchComponent

    ]
})
export class SharedModule { }
