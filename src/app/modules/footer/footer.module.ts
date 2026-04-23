import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';

const GenericModules = [
  TwUiKitLocalModule,
  RouterModule,
  PipesModule,
  SharedTranslateModule,
  TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    }),
];

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    GenericModules
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
