import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTextInputComponent } from './form-text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FormTextInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedTranslateModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  exports: [
    FormTextInputComponent
  ]
})
export class FormTextInputModule { }
