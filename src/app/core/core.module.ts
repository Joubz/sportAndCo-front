import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicModule } from '../public/public.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import {httpErrorInterceptorProviders} from "./interceptors/http-error.interceptor";
import { NotificationsComponent } from './notification/notification.component';

/**
 * Gestion des modules et composants de Core
 */
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    PublicModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    NotificationsComponent
  ],
  providers: [httpErrorInterceptorProviders]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Le CoreModule est déjà chargé.');
    }
  }
}
