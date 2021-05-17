import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DatepickerModule } from 'ng2-datepicker';

/**
 * Gestion des modules et composants de Shared
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
  ],
  exports: [],
})
export class SharedModule {}
