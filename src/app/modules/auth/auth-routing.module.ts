import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthOnbordingComponent } from './auth-onbording/auth-onbording.component';
import { AuthTokenComponent } from './auth-token/auth-token.component';
import { AuthVerifyComponent } from './auth-verify/auth-verify.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: AuthLoginComponent,
      },
      {
        path: 'onboarding',
        component: AuthOnbordingComponent,
      },
      {
        path: 'token/:email',
        component: AuthTokenComponent,
      },
      {
        path: 'token',
        component: AuthTokenComponent,
      },
      {
        path: 'verify',
        component: AuthVerifyComponent,
      },
      {
        path: 'register',
        component: AuthRegisterComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
