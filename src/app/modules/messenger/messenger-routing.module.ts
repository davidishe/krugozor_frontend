import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { FooterModule } from '../footer/footer.module';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';
import { NavbarModule } from '../navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: MessengerComponent,
  },
  {
    path: ':recepientId',
    component: MessengerComponent,
  }
];

const GenericModules = [
  TwUiKitLocalModule,
  RouterModule,
  PipesModule,
  ReactiveFormsModule,
  FormsModule,
  SharedTranslateModule,
  TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    }),
  FooterModule,
  NavbarModule
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessengerRoutingModule { }
