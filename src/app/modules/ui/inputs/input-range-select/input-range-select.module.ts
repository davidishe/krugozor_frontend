import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRangeSelectComponent } from './input-range-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValueColumnComponent } from './value-column/value-column.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { SelectedComponent } from './selected/selected.component';



@NgModule({
  declarations: [
    InputRangeSelectComponent,
    SelectedComponent,
    ValueColumnComponent
  ],
  imports: [
    CommonModule,
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
  ],
  exports: [
    InputRangeSelectComponent
  ]
})
export class InputRangeSelectModule { }
