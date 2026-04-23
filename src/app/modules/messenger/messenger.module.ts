import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './messenger.component';
import { MessengerRoutingModule } from './messenger-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { FooterModule } from '../footer/footer.module';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';
import { HttpClient } from '@angular/common/http';
import { TwUiKitModule } from 'tw-ui-kit';
import { NavbarModule } from '../navbar/navbar.module';
import { MessageComponent } from './message/message.component';
import { FormTextInputModule } from '../dashboard/dashboard-settings/form-text-input/form-text-input.module';
import { UserCardHeaderComponent } from './user-card-header/user-card-header.component';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { MessageAuthorComponent } from './message/message-author/message-author.component';
import { MessengerChatHeaderActionsComponent } from './messenger-chat-header-actions/messenger-chat-header-actions.component';
import { MessengerEmptyMessegesComponent } from './messenger-empty-messeges/messenger-empty-messeges.component';


export class MyIntl extends TimeagoIntl {
// do extra stuff here...
}

const GenericModules = [
  TwUiKitLocalModule,
  TwUiKitModule,
  RouterModule,
  PipesModule,
  ReactiveFormsModule,
  FormsModule,
  NavbarModule,
  FormTextInputModule,
  SharedTranslateModule,
  TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    }),
  FooterModule,
  TimeagoModule.forChild(
    {
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter 
    }},
  )
];

@NgModule({
  declarations: [
    MessengerComponent,
    MessageComponent,
    UserCardHeaderComponent,
    MessageAuthorComponent,
    ScrollToBottomDirective,
    MessengerEmptyMessegesComponent,
    MessengerChatHeaderActionsComponent
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    GenericModules
  ],
  exports: [
    MessengerComponent
  ]
})
export class MessengerModule { }
