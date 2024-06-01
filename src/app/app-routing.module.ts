import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./views/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lindas',
    loadChildren: () => import('./views/cosas/lindas/lindas.module').then( m => m.LindasPageModule)
  },
  {
    path: 'feas',
    loadChildren: () => import('./views/cosas/feas/feas.module').then( m => m.FeasPageModule)
  },
  {
    path: 'stats-lindas',
    loadChildren: () => import('./views/stats-lindas/stats-lindas.module').then( m => m.StatsLindasPageModule)
  },
  {
    path: 'stats-feas',
    loadChildren: () => import('./views/stats-feas/stats-feas.module').then( m => m.StatsFeasPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./views/perfil/perfil.module').then( m => m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
