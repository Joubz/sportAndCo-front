import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { PublicModule } from './public/public.module';
import { ProtectedModule } from './protected/protected.module';
import { AdministratorModule } from "./administrator/administrator.module";
import { RenterModule } from "./renter/renter.module";

import { DatepickerModule } from 'ng2-datepicker';

/**
 * Gestion des modules et composants généraux
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PublicModule,
    ProtectedModule,
    AdministratorModule,
    RenterModule,
    AppRoutingModule,
    DatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
