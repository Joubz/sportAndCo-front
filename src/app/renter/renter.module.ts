import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RenterRoutingModule } from './renter-routing.module';
import { RandomRenterComponentComponent } from "./random-renter-component/random-renter-component.component";

/**
 * Gestion des modules et composants de Renter
 */
@NgModule({
  declarations: [RandomRenterComponentComponent],
  imports: [
    CommonModule,
    RenterRoutingModule
  ]
})
export class RenterModule { }
