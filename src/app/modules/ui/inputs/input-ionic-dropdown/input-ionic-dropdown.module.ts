import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { IonicModule } from '@ionic/angular';
import { InputIonicDropdownComponent } from './input-ionic-dropdown.component';




@NgModule({
  declarations: [
    InputIonicDropdownComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    IonicModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    InputIonicDropdownComponent
  ]
})
export class InputIonicDropdownModule { }
