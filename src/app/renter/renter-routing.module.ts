import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomRenterComponentComponent } from "./random-renter-component/random-renter-component.component";

const routes: Routes = [
  {
    path: 'exemple',
    component: RandomRenterComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenterRoutingModule { }
