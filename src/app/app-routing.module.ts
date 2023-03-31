import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prisma-config',
    pathMatch: 'full'
  },
  {
    path: 'prisma-config',
    loadChildren: () => import('./views/prisma-config/prisma-config.module').then( m => m.PrismaConfigPageModule)
  },
  {
    path: 'banner-view',
    loadChildren: () => import('./views/banner-view/banner-view.module').then( m => m.BannerViewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
