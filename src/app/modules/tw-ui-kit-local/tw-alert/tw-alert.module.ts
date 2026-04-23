import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwAlertComponent } from './tw-alert.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TwAlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TwAlertComponent
  ]
})
export class TwAlertModule { }
