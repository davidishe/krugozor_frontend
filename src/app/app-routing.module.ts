import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    // canActivate: [LogedGuard]
  },
  {
    path: 'messenger',
    loadChildren: () => import('./modules/messenger/messenger.module').then(m => m.MessengerModule),
    // canActivate: [LogedGuard]
  },
  {
    path: '**', 
    redirectTo: ''
  }, // redirecting to default route in case of any other prefix
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
