import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';
import { FeatureItemComponent } from './modules/feature-item/feature-item.component';
import { StepsComponent } from './modules/steps/steps.component';
import { FooterModule } from '../footer/footer.module';
import { TeamComponent } from './modules/team/team.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTextInputModule } from '../dashboard/dashboard-settings/form-text-input/form-text-input.module';
import { LandingSectionUserFlowComponent } from './modules/landing-section-user-flow/landing-section-user-flow.component';
import { TwUiKitModule } from 'tw-ui-kit';
import { LandingTitleComponent } from './modules/landing-title/landing-title.component';
import { LandingProblemExplanationComponent } from './modules/landing-problem-explanation/landing-problem-explanation.component';
import { LandingFaqComponent } from './modules/landing-faq/landing-faq.component';
import { LandingFaqItemComponent } from './modules/landing-faq/landing-faq-item/landing-faq-item.component';
import { LandingProblemExplanationItemComponent } from './modules/landing-problem-explanation/landing-problem-explanation-item/landing-problem-explanation-item.component';
import { LandingParticipantRolesComponent } from './modules/landing-participant-roles/landing-participant-roles.component';


const GenericModules = [
  TwUiKitLocalModule,
  TwUiKitModule,
  RouterModule,
  PipesModule,
  ReactiveFormsModule,
  FormsModule,
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
  FooterModule
];

const ModuleComponents = [
  StepsComponent,
  TeamComponent,
  LandingComponent,
  FeatureItemComponent,
  QuestionsComponent,
  LandingSectionUserFlowComponent,
  LandingTitleComponent,
  LandingProblemExplanationComponent,
  LandingFaqComponent,
  LandingFaqItemComponent,
  LandingProblemExplanationItemComponent,
  LandingParticipantRolesComponent
];

@NgModule({
  declarations: [
    ModuleComponents
  ],
  imports: [
    CommonModule,
    NavbarModule,
    LandingRoutingModule,
    GenericModules
  ]
})
export class LandingModule { }
