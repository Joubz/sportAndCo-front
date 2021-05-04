import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExempleComponentComponent } from './exemple-component/exemple-component.component';

const routes: Routes = [
  {
    path: 'exemple',
    component: ExempleComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
