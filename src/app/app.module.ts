import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import {CoreModule} from "./core/core.module";
import { ExempleComponentComponent } from './protected/exemple-component/exemple-component.component';
import { RandomAdminComponentComponent } from './administrator/random-admin-component/random-admin-component.component';
import { RandomRenterComponentComponent } from './renter/random-renter-component/random-renter-component.component';


@NgModule({
  declarations: [
    AppComponent,
    ExempleComponentComponent,
    RandomAdminComponentComponent,
    RandomRenterComponentComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    PublicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
