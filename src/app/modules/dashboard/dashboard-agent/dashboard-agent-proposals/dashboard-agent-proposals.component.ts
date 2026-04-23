import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IStrapiDto } from 'src/app/models/main/dtos';
import { MyProposalsService } from './dashboard-agent-proposals.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-agent-proposals',
  templateUrl: './dashboard-agent-proposals.component.html',
  styleUrls: ['./dashboard-agent-proposals.component.scss']
})
export class DashboardAgentProposalsComponent implements OnInit, OnDestroy {

  imageUri = environment.imageUri;
  myProposals$: Observable<any>;
  sub: Subscription;

  constructor(
    private myProposalsService: MyProposalsService,
    private router: Router
  ) { }


  ngOnInit() {
    const strapiCompanyId = localStorage.getItem('strapiCompanyId');
    this.myProposalsService.getMyProposals(+strapiCompanyId);
    this.myProposals$ = this.myProposalsService.myProposals$;
  }

  addNewProposal() {
    let strapiDto: IStrapiDto = {
      strapiProposalId: 0
    };

    this.sub = this.myProposalsService.createOrUpdateItemWithStrapi(strapiDto).subscribe((res: any) => {
      if (res) {
        const proposalId = JSON.parse(res.content).data.id;
        this.router.navigate(['dashboard/proposals', proposalId]);
      }
    })

  }

  openProposalEditPage(proposal: any) {
    console.log(proposal.id);
    this.router.navigate(['dashboard/proposals', proposal.id]);
    
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }



}
