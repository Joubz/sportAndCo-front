import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ExempleComponentComponent } from './exemple-component/exemple-component.component';

/**
 * Gestion des modules et composants de Protected
 */
@NgModule({
  declarations: [ExempleComponentComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
