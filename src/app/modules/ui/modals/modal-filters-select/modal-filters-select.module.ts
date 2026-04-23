import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFiltersSelectComponent } from './modal-filters-select.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { FiltersBtnComponent } from './filters-btn/filters-btn.component';
import { TwUiKitLocalModule } from 'src/app/modules/tw-ui-kit-local/tw-ui-kit-local.module';
import { CloseModule } from '../../close/close.module';
import { InputRangeSelectModule } from '../../inputs/input-range-select/input-range-select.module';
import { RangeInputsFormComponent } from './range-inputs-form/range-inputs-form.component';
import { FormTextInputModule } from 'src/app/modules/dashboard/dashboard-settings/form-text-input/form-text-input.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TwAutocompleteSelectComponent } from './tw-autocomplete-select/tw-autocomplete-select.component';
import { TwAutocompleteSelectOptionComponent } from './tw-autocomplete-select/tw-autocomplete-select-option/tw-autocomplete-select-option.component';
import { RangePlaceAreaComponent } from './range-place-area/range-place-area.component';
import { PotentialUsingComponent } from './potential-using/potential-using.component';
import { RangeBuildingDateComponent } from './range-building-date/range-building-date.component';
import { FiltersAmenitiesComponent } from './filters-amenities/filters-amenities.component';
import { TwUiKitModule } from 'tw-ui-kit';



@NgModule({
  declarations: [
    ModalFiltersSelectComponent, 
    FiltersBtnComponent,
    FiltersAmenitiesComponent,
    RangeInputsFormComponent,
    RangePlaceAreaComponent,
    RangeBuildingDateComponent,
    TwAutocompleteSelectComponent,
    TwAutocompleteSelectOptionComponent,
    PotentialUsingComponent,
    
  ],
  imports: [
    CommonModule,
    SharedTranslateModule,
    TwUiKitLocalModule,
    TwUiKitModule,
    InputRangeSelectModule,
    // FiltersButtonChipModule,
    CloseModule,
    PipesModule,
    FormTextInputModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  exports: [ModalFiltersSelectComponent]
})
export class ModalFiltersSelectModule { }
