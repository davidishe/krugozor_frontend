import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatBtnSmallModule } from '../ui/buttons/mat-btn-small/mat-btn-small.module';
import { MatBtnOnlyIconModule } from '../ui/buttons/mat-btn-only-icon/mat-btn-only-icon.module';
import { DashboardInitiativeComponent } from './dashboard-initiative/dashboard-initiative.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { SharedTranslateModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '../ui/buttons/mat-button/mat-button.module';
import { PlaceInformationComponent } from './dashboard-initiative/place-information/place-information.component';
import { SectionHeaderModule } from '../ui/section-header/section-header.module';
import { AmenitieModule } from '../ui/amenitie/amenitie.module';
import { TableModule } from '../ui/table/table.module';
import { PhotosComponent } from './dashboard-initiative/photos/photos.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { TwUiKitLocalModule } from '../tw-ui-kit-local/tw-ui-kit-local.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { TwBigIconComponent } from './profile-menu/tw-big-icon/tw-big-icon.component';
import { PhotosElementComponent } from './dashboard-initiative/photos/photos-element/photos-element.component';
import { DashboardItemHeaderSectionComponent } from './dashboard-initiative/dashboard-item-header-section/dashboard-item-header-section.component';
import { DashboardListFiltersWorkspaceComponent } from './dashboard-list/dashboard-list-filters-workspace/dashboard-list-filters-workspace.component';
import { TwTooltipModule } from '../tw-ui-kit-local/tw-tooltip/tw-tooltip.module';
import { ShadersComponent } from './dashboard-list/shaders/shaders.component';
import { ProductInfoComponent } from './dashboard-initiative/product-info/product-info.component';
import { SectionNotesComponent } from './profile/section-notes/section-notes.component';
import { SectionAttachmentsComponent } from './profile/section-attachments/section-attachments.component';
import { DashboardSettingsComponent } from './dashboard-settings/dashboard-settings.component';
import { FormSectionComponent } from './dashboard-settings/form-section/form-section.component';
import { FormPhotoComponent } from './dashboard-settings/form-photo/form-photo.component';
import { FormButtonComponent } from '../tw-ui-kit-local/buttons/form-button/form-button.component';
import { FormProfileInfoComponent } from './dashboard-settings/form-profile-info/form-profile-info.component';
import { FormContactsComponent } from './dashboard-settings/form-contacts/form-contacts.component';
import { FormSettingsComponent } from './dashboard-settings/form-settings/form-settings.component';
// import { RequestsComponent } from './requests/requests.component';
import { SpinnerComponent } from './dashboard-list/spinner/spinner.component';
import { PopoverModule } from '../ui/popover/popover.module';
import { FiltersButtonModule } from '../ui/chips/filters-button/filters-button.module';
import { ModalFiltersSelectModule } from '../ui/modals/modal-filters-select/modal-filters-select.module';
import { CloseModule } from '../ui/close/close.module';
import { FormTextInputModule } from './dashboard-settings/form-text-input/form-text-input.module';
import { SortingButtonComponent } from './dashboard-list/dashboard-list-filters-workspace/sorting-button/sorting-button.component';
import { TwAlertModule } from '../tw-ui-kit-local/tw-alert/tw-alert.module';
import { ProposalFeaturesComponent } from './dashboard-initiative/proposal-feature/proposal-feature.component';
import { DashboardAgentProposalsComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals.component';
import { FormCompanyComponent } from './dashboard-settings/form-company/form-company.component';
import { DashboardCompanyEditComponent } from './dashboard-company-edit/dashboard-company-edit.component';
import { DashboardCompanyEditAvatarComponent } from './dashboard-company-edit/dashboard-company-edit-avatar/dashboard-company-edit-avatar.component';
import { DashboardCompanyEditCitiesSelectComponent } from './dashboard-company-edit/dashboard-company-edit-cities/dashboard-company-edit-cities-select/dashboard-company-edit-cities-select.component';
import { DashboardCompanyEditCitiesComponent } from './dashboard-company-edit/dashboard-company-edit-cities/dashboard-company-edit-cities.component';
import { InvestorsListComponent } from './dashboard-initiative/product-info/investors-list/investors-list.component';
import { DashboardCompanySiteComponent } from './dashboard-company-site/dashboard-company-site.component';
import { CreatePledgeComponent } from './dashboard-initiative/create-pledge/create-pledge.component';
import { BtnWithHintComponent } from './dashboard-initiative/product-info/investors-list/btn-with-hint/btn-with-hint.component';
import { TwUiKitModule } from 'tw-ui-kit';
import { DashboardAgentListItemComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent-list-item/dashboard-agent-list-item.component';
import { DashboardAgentProposalRequestComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent-list-item/dashboard-agent-proposal/dashboard-agent-proposal-request/dashboard-agent-proposal-request.component';
import { DashboardAgentProposalComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent-list-item/dashboard-agent-proposal/dashboard-agent-proposal.component';
import { DashboardAgentComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent.component';
import { DashboardAgentProposalEditComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/dashboard-agent-proposal-edit.component';
import { MyProposalPageCategoriesComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/my-proposal-page-categories/my-proposal-page-categories.component';
import { MyProposalPageCitiesSelectOptionComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/my-proposal-page-cities/my-proposal-page-cities-select/my-proposal-page-cities-select-option/my-proposal-page-cities-select-option.component';
import { MyProposalPageCitiesSelectComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/my-proposal-page-cities/my-proposal-page-cities-select/my-proposal-page-cities-select.component';
import { MyProposalPageCitiesComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/my-proposal-page-cities/my-proposal-page-cities.component';
import { MyProposalPageImagesComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/my-proposal-page-images/my-proposal-page-images.component';
import { DashboardAgentProposalsEditAmenitiesComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/agent-proposals-edit-amenities/agent-proposals-edit-amenities.component';
import { AgentProposalsEditImageComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/my-proposal-page-images/agent-proposals-edit-image/agent-proposals-edit-image.component';
import { DashboardFavoursComponent } from './dashboard-favours/dashboard-favours.component';
import { DashboardAgentProposalRequestChangeComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent-list-item/dashboard-agent-proposal/dashboard-agent-proposal-request/dashboard-agent-proposal-request-change/dashboard-agent-proposal-request-change.component';
import { DashboardDonateComponent } from './dashboard-donate/dashboard-donate.component';
import { DashboardDonateFeatureComponent } from './dashboard-donate/dashboard-donate-feature/dashboard-donate-feature.component';
import { DashboardInitiativeFilesComponent } from './dashboard-initiative/product-info/dashboard-initiative-files/dashboard-initiative-files.component';
import { AgentProposalEditFilesComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/agent-proposal-edit-files/agent-proposal-edit-files.component';
import { DashboardUserRequestsComponent } from './dashboard-user-requests/dashboard-user-requests.component';
import { BtnActionItemComponent } from './dashboard-initiative/product-info/investors-list/btn-action-item/btn-action-item.component';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { CardComponent } from './dashboard-list/card/card.component';




const DashboardComponents = [
  DashboardListComponent,

  // профиль  
  ProfileComponent,
  SectionNotesComponent,

  ProfileMenuComponent,
  TwBigIconComponent,
  PhotosElementComponent,
  DashboardItemHeaderSectionComponent,
  DashboardListFiltersWorkspaceComponent,
  PlaceInformationComponent,
  DashboardComponent,
  DashboardInitiativeComponent,
  DashboardInitiativeFilesComponent,



  PhotosComponent,
  ShadersComponent,
  ProductInfoComponent,
  SectionAttachmentsComponent,
  DashboardAgentProposalsComponent,
  SpinnerComponent,

  DashboardSettingsComponent,
  FormSectionComponent,
  FormPhotoComponent,
  FormButtonComponent,
  FormProfileInfoComponent,
  FormContactsComponent,
  FormSettingsComponent,
  // RequestsComponent,
  SortingButtonComponent,
  ProposalFeaturesComponent,

  MyProposalPageImagesComponent,
  MyProposalPageCitiesComponent,
  MyProposalPageCitiesSelectComponent,
  MyProposalPageCitiesSelectOptionComponent,
  MyProposalPageCategoriesComponent,
  FormCompanyComponent,
  DashboardCompanyEditComponent,
  DashboardCompanyEditAvatarComponent,
  DashboardCompanyEditCitiesSelectComponent,
  DashboardCompanyEditCitiesComponent,

  DashboardAgentProposalsEditAmenitiesComponent,
  AgentProposalEditFilesComponent,
  AgentProposalsEditImageComponent,

  InvestorsListComponent,
  BtnActionItemComponent,

  DashboardAgentComponent,
  DashboardAgentProposalRequestComponent,
  DashboardAgentProposalRequestChangeComponent,

  DashboardAgentProposalComponent,
  DashboardAgentListItemComponent,
  DashboardAgentProposalEditComponent,

  DashboardCompanySiteComponent,
  DashboardDonateComponent,
  DashboardDonateFeatureComponent,
  CreatePledgeComponent,
  BtnWithHintComponent,

  DashboardFavoursComponent,

  DashboardUserRequestsComponent,


];

const DashboardDirectives = [
]



const Modules = [
  FiltersButtonModule,
  ModalFiltersSelectModule,
  CloseModule,
  FormTextInputModule,
  TwAlertModule,
  TwUiKitModule,
  NavbarModule,
  RouterModule,
  CardComponent
];


@NgModule({
  imports: [
    Modules,
    TableModule,
    CommonModule,
    FormsModule,
    UiModule,
    PopoverModule,
    TwTooltipModule,
    TwUiKitLocalModule,
    SectionHeaderModule,
    AmenitieModule,
    DashboardRoutingModule,
    MatBtnSmallModule,
    ReactiveFormsModule,
    MatBtnOnlyIconModule,
    ReactiveFormsModule,
    MatButtonModule,
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

  ],
  declarations: [
    DashboardComponents,
    DashboardDirectives
  ],
  providers: [
    SlicePipe

  ]
})
export class DashboardModule {
}
