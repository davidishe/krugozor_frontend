import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopoverComponent } from './popover.component';
import { AmenitieModule } from '../amenitie/amenitie.module';
import { SectionHeaderModule } from '../section-header/section-header.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { TwUiKitLocalModule } from '../../tw-ui-kit-local/tw-ui-kit-local.module';
import { TwUiKitModule } from 'tw-ui-kit';


@NgModule({
  declarations: [
    PopoverComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AmenitieModule,
    TwUiKitLocalModule,
    TwUiKitModule,
    SectionHeaderModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    })

  ],
  exports: [
    PopoverComponent
  ]
})
export class  PopoverModule { }
