import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListEquipmentComponent } from './list-equipment/list-equipment.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { DatepickerModule } from 'ng2-datepicker';

/**
 * Gestion des modules et composants de Public
 */
@NgModule({
  declarations: [
    HomeComponent,
    LegalNoticeComponent,
    NotFoundComponent,
    ListEquipmentComponent,
    EquipmentSearchComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
  ],
})
export class PublicModule {}
