import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RenterRoutingModule } from './renter-routing.module';
import { ProductListRenterComponent } from './product-list-renter/product-list-renter.component';


/**
 * Gestion des modules et composants de Renter
 */
@NgModule({
  declarations: [
    ProductListRenterComponent
  ],
  imports: [
    CommonModule,
    RenterRoutingModule
  ]
})
export class RenterModule { }
