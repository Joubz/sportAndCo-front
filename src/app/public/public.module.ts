import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import {DatepickerModule} from "ng2-datepicker";

/**
 * Gestion des modules et composants de Public
 */
@NgModule({
  declarations: [HomeComponent, LegalNoticeComponent, NotFoundComponent, ClientRegistrationComponent],
    imports: [
        CommonModule,
        PublicRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        DatepickerModule
    ]
})
export class PublicModule { }
