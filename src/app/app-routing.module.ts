import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

/**
 * Ne contient que la route wildcard
 */
const routes: Routes = [
  {
    path: '**',
    redirectTo: '/404'
  }
];

/**
 * Options du router pour la réinitialisation du scroll (en haut de page) lors du changement de route
 */
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  useHash: false,
  anchorScrolling: 'enabled'
};

/**
 * @ignore
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
