import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListRenterComponent } from './product-list-renter/product-list-renter.component';

const routes: Routes = [
  {
    path: 'renter-equipment-list',
    component: ProductListRenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenterRoutingModule { }
