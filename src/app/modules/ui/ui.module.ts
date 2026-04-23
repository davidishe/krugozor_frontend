import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackLinkComponent } from './back-link/back-link.component';
import { MapElementComponent } from './map-element/map-element.component';
import { MapComponent } from './map-element/map/map.component';
import { ToggleButtonComponent } from './buttons/toggle-btn/toggle-button.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { HelpEntityComponent } from './help-entity/help-entity.component';
import { AmenitieModule } from './amenitie/amenitie.module';
import { SectionHeaderModule } from './section-header/section-header.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { NothingAddedComponent } from './nothing-added/nothing-added.component';
import { LogoComponent } from './logo/logo.component';
import { LangSelectComponent } from './modals/lang-select/lang-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatAutocompleteModule } from "@angular/material/autocomplete";
// import { FiltersButtonChipModule } from './chips/filters-button-chip/filters-button-chip.module';
import { FiltersButtonModule } from './chips/filters-button/filters-button.module';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';
import { TwUiKitModule } from 'tw-ui-kit';

const UiKitComponents = [
    NothingAddedComponent,
    BackLinkComponent,
    MapElementComponent,
    MapComponent,
    ToggleButtonComponent,
    HelpEntityComponent,
    PageTitleComponent,
    LangSelectComponent,
    LogoComponent,
]



@NgModule({
  declarations: [
    UiKitComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
    AmenitieModule,
    SectionHeaderModule,
    FormsModule,
    TwUiKitLocalModule,
    ReactiveFormsModule,
    FiltersButtonModule,
    TwUiKitModule,
    // FiltersButtonChipModule,
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
    UiKitComponents,
  ],
  providers: [
  ]
})
export class UiModule {
}
