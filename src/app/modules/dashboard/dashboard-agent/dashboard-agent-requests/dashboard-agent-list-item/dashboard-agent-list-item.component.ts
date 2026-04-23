import { Component, Input, OnInit } from '@angular/core';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-dashboard-agent-list-item',
  templateUrl: './dashboard-agent-list-item.component.html',
  styleUrls: ['./dashboard-agent-list-item.component.css']
})
export class DashboardAgentListItemComponent implements OnInit {

  @Input() proposalProfile: any;
  strapiProposal: any;

  constructor(
    private proposalService: ProposalsService
  ) { }

  ngOnInit() {
    const strapiProposalId = (this.proposalProfile.strapiProposalId);
    this.proposalService.getItemById(strapiProposalId).subscribe((res: any) => {
      if (res) {
        this.strapiProposal = res;

      }
    })
  }

  isDealReady() {

  }


}
