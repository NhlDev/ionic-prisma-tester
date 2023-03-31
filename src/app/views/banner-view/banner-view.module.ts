import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerViewPageRoutingModule } from './banner-view-routing.module';

import { BannerViewPage } from './banner-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerViewPageRoutingModule
  ],
  declarations: [BannerViewPage]
})
export class BannerViewPageModule {}
