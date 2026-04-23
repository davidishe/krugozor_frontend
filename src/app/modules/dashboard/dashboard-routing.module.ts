import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardInitiativeComponent } from './dashboard-initiative/dashboard-initiative.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { DashboardSettingsComponent } from './dashboard-settings/dashboard-settings.component';
// import { RequestsComponent } from './requests/requests.component';
import { DashboardAgentProposalsComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals.component';
import { DashboardCompanyEditComponent } from './dashboard-company-edit/dashboard-company-edit.component';
import { DashboardCompanySiteComponent } from './dashboard-company-site/dashboard-company-site.component';
import { DashboardAgentComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent.component';
import { DashboardAgentProposalComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent-list-item/dashboard-agent-proposal/dashboard-agent-proposal.component';
import { DashboardAgentProposalRequestComponent } from './dashboard-agent/dashboard-agent-requests/dashboard-agent-list-item/dashboard-agent-proposal/dashboard-agent-proposal-request/dashboard-agent-proposal-request.component';
import { DashboardAgentProposalEditComponent } from './dashboard-agent/dashboard-agent-proposals/dashboard-agent-proposals-edit/dashboard-agent-proposal-edit.component';
import { DashboardFavoursComponent } from './dashboard-favours/dashboard-favours.component';
import { DashboardDonateComponent } from './dashboard-donate/dashboard-donate.component';
import { DashboardUserRequestsComponent } from './dashboard-user-requests/dashboard-user-requests.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full',
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'settings',
        component: DashboardSettingsComponent,
        canActivate: [ AuthGuard ]
      },      
      // {
      //   path: 'requests',
      //   component: RequestsComponent,
      //   canActivate: [ AuthGuard ]
      // },
      {
        path: 'proposals',
        component: DashboardAgentProposalsComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'proposals/:proposalId',
        component: DashboardAgentProposalEditComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'proposals/new',
        component: DashboardAgentProposalEditComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'company/edit/:companyId',
        component: DashboardCompanyEditComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'company/site/:companyId',
        component: DashboardCompanySiteComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'agent',
        component: DashboardAgentComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'agent/proposal/:strapiProposalId',
        component: DashboardAgentProposalComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'agent/proposal/:strapiProposalId/request/:requestId',
        component: DashboardAgentProposalRequestComponent,
        canActivate: [ AuthGuard ]
      },

      {
        path: 'requests',
        component: DashboardUserRequestsComponent,
        canActivate: [ AuthGuard ]
      },

      {
        path: 'items',
        component: DashboardListComponent,
      },
      {
        path: 'items/:id',
        component: DashboardInitiativeComponent,
      },
      { 
      path: 'donate',
        component: DashboardDonateComponent,
      },    
      {
        path: 'favours',
        component: DashboardFavoursComponent,
      }
      // {
      //   path: 'sandbox',
      //   component: AndboxComponent,
      // },

      

      




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
