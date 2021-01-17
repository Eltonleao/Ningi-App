import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NingiDetailsPage } from './ningi-details.page';

const routes: Routes = [
  {
    path: '',
    component: NingiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NingiDetailsPageRoutingModule {}
