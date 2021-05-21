import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RenterRoutingModule } from './renter-routing.module';
import { RenterRegistrationComponent } from './renter-registration/renter-registration.component';

/**
 * Gestion des modules et composants de Renter
 */
@NgModule({
  declarations: [RenterRegistrationComponent],
  imports: [
    CommonModule,
    RenterRoutingModule
  ]
})
export class RenterModule { }
