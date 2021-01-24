import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisesPage } from './analises.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisesPageRoutingModule {}
