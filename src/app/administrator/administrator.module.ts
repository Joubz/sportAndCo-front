import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AcceptRenterComponent } from './accept-renter/accept-renter.component';
import { RenterListComponent } from './renter-list/renter-list.component';

/**
 * Gestion des modules et composants de Administrator
 */
@NgModule({
  declarations: [
    AcceptRenterComponent,
    RenterListComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule
  ]

})

export class AdministratorModule { }
