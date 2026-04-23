import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { UiModule } from '../ui/ui.module';
import { TitleModule } from '../ui/title/title.module';
import { MatBtnSmallModule } from '../ui/buttons/mat-btn-small/mat-btn-small.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { AuthOnbordingComponent } from './auth-onbording/auth-onbording.component';
import { AuthTokenComponent } from './auth-token/auth-token.component';
import { AuthVerifyComponent } from './auth-verify/auth-verify.component';
import { TwUiKitModule } from 'tw-ui-kit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TitleModule,
    MatBtnSmallModule,
    TwUiKitModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthOnbordingComponent,
    AuthVerifyComponent,
    AuthTokenComponent
  ],
  providers: [
  ]
})
export class AuthModule {
}
