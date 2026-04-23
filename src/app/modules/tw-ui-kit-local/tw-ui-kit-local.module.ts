import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from 'src/app/app.module';
import { TwBadgeComponent } from './tw-badge/tw-badge.component';
// import { TwButtonSecondComponent } from './buttons/tw-button-second/tw-button-second.component';
import { TwIconComponent } from './tw-icon/tw-icon.component';
import { TwIconNavbarComponent } from './tw-icon-navbar/tw-icon-navbar.component';
import { TwProfileBadgeComponent } from './tw-profile-badge/tw-profile-badge.component';
import { TwBreadcrumbComponent } from './tw-breadcrumb/tw-breadcrumb.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TwInputSearchComponent } from './tw-input-search/tw-input-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwTooltipModule } from './tw-tooltip/tw-tooltip.module';
import { TwCardSkeletonComponent } from './tw-card-skeleton/tw-card-skeleton.component';
import { TwProfileBadgeLoginComponent } from './tw-profile-badge-login/tw-profile-badge-login.component';
import { TwBadgeSmallComponent } from './tw-badge-small/tw-badge-small.component';
import { TwAlertErrorComponent } from './tw-alert-error/tw-alert-error.component';
import { TwButtonIconComponent } from './buttons/tw-button-icon/tw-button-icon.component';
// import { BackButtonDirective } from 'src/app/shared/directives/back-button.directive';
import { TwUiKitModule } from 'tw-ui-kit';
import { TwImageGalleryComponent } from './tw-image-gallery/tw-image-gallery.component';


const UI_COMPONENTS = [
  TwBadgeComponent,
  // TwButtonSecondComponent,
  TwIconComponent,
  TwIconNavbarComponent,
  TwProfileBadgeComponent,
  TwButtonIconComponent,
  TwBreadcrumbComponent,
  TwInputSearchComponent,
  TwCardSkeletonComponent,
  TwProfileBadgeLoginComponent,
  TwBadgeSmallComponent,
  // TwEmptyComponent,
  TwAlertErrorComponent,
  TwImageGalleryComponent
  // TwToggleComponent
  // TwCardWideLocalComponent
];

const CustomModules = [
];


const DashboardDirectives = [
  // BackButtonDirective
];


@NgModule({
  declarations: [
    UI_COMPONENTS,
    DashboardDirectives
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    // FiltersButtonChipModule,
    TwTooltipModule,
    TwUiKitModule,
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
    UI_COMPONENTS,
    DashboardDirectives
  ],
  providers: [

  ]
})
export class TwUiKitLocalModule {
}
