import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { RandomAdminComponentComponent } from "./random-admin-component/random-admin-component.component";

/**
 * Gestion des modules et composants de Administrator
 */
@NgModule({
  declarations: [RandomAdminComponentComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule
  ]

})

export class AdministratorModule { }
