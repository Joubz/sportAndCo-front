import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details.component';

/**
 * Gestion des modules et composants de Shared
 */
@NgModule({
  declarations: [

  
    EquipmentDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [

  ]
})
export class SharedModule { }
