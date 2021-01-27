import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'ningis',
        loadChildren: () => import('../ningis/ningis.module').then(m => m.NingisPageModule)
      },
      {
        path: 'ningi-details',
        loadChildren: () => import('../ningi-details/ningi-details.module').then(m => m.NingiDetailsPageModule)
      },
      {
        path: 'ningi-details/:id',
        loadChildren: () => import('../ningi-details/ningi-details.module').then(m => m.NingiDetailsPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'analises',
        loadChildren: () => import('../analises/analises.module').then(m => m.AnalisesPageModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('../charts/charts.module').then(m => m.ChartsPageModule)
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/tab1',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
