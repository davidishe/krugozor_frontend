import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitieComponent } from './amenitie.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    AmenitieComponent
  ],
  imports: [
    CommonModule,
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
    AmenitieComponent
  ]
})
export class AmenitieModule { }
