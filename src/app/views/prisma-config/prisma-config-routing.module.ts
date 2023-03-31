import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrismaConfigPage } from './prisma-config.page';

const routes: Routes = [
  {
    path: '',
    component: PrismaConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrismaConfigPageRoutingModule {}
