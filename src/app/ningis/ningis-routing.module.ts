import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NingisPage } from './ningis.page';

const routes: Routes = [
  {
    path: '',
    component: NingisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NingisPageRoutingModule {}
