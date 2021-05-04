import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { PublicModule } from './public/public.module';
import { ProtectedModule } from './protected/protected.module';
import { AdministratorModule } from "./administrator/administrator.module";
import { RenterModule } from "./renter/renter.module";
import { ExempleComponentComponent } from './protected/exemple-component/exemple-component.component';

/**
 * Gestion des modules et composants généraux
 */
@NgModule({
  declarations: [
    AppComponent,
    ExempleComponentComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    PublicModule,
    ProtectedModule,
    AdministratorModule,
    RenterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
