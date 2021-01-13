import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NingisPageRoutingModule } from './ningis-routing.module';

import { NingisPage } from './ningis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NingisPageRoutingModule
  ],
  declarations: [NingisPage]
})
export class NingisPageModule {}
