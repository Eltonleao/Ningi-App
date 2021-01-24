import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisesPageRoutingModule } from './analises-routing.module';

import { AnalisesPage } from './analises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisesPageRoutingModule
  ],
  declarations: [AnalisesPage]
})
export class AnalisesPageModule {}
