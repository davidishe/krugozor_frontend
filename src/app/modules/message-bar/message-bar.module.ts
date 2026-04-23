import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBarNotifyComponent } from './message-bar-notify/message-bar-notify.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { PopoverModule } from '../ui/popover/popover.module';
import { TwAlertModule } from '../tw-ui-kit-local/tw-alert/tw-alert.module';
import { TwUiKitModule } from 'tw-ui-kit';
import { FiltersButtonModule } from '../ui/chips/filters-button/filters-button.module';
import { CloseModule } from '../ui/close/close.module';
import { ModalFiltersSelectModule } from '../ui/modals/modal-filters-select/modal-filters-select.module';
import { UiModule } from '../ui/ui.module';
import { RouterModule } from '@angular/router';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';
import { MessageBarComponent } from './message-bar.component';

const Modules = [
  FiltersButtonModule,
  ModalFiltersSelectModule,
  UiModule,
  CloseModule,
  TwAlertModule,
  TwUiKitModule,
];


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
    MessageBarComponent,
    MessageBarNotifyComponent,
  ],
  imports: [
    Modules,
    CommonModule,
    PopoverModule,
    GenericModules
  ],
  exports: [
    MessageBarComponent,
    MessageBarNotifyComponent,
  ]
})
export class MessageBarNotifyModule { }
