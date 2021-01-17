import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NingiDetailsPageRoutingModule } from './ningi-details-routing.module';

import { NingiDetailsPage } from './ningi-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NingiDetailsPageRoutingModule
  ],
  declarations: [NingiDetailsPage]
})
export class NingiDetailsPageModule {}
