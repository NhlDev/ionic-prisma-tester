import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerViewPage } from './banner-view.page';

const routes: Routes = [
  {
    path: '',
    component: BannerViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerViewPageRoutingModule {}
