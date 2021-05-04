import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { NotFoundComponent } from './not-found/not-found.component';

/**
 * Gestion des modules et composants de Public
 */
@NgModule({
  declarations: [HomeComponent, LegalNoticeComponent, NotFoundComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PublicModule { }
