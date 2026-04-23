import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/modules/dashboard/requests/requests.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';

@Component({
  selector: 'app-dashboard-agent-proposal',
  templateUrl: './dashboard-agent-proposal.component.html',
  styleUrls: ['./dashboard-agent-proposal.component.css']
})
export class DashboardAgentProposalComponent implements OnInit {

  strapiProposalId: number;
  proposalProfile: any;
  requests: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestsService: RequestsService,
    private alertService: TwAlertService
  ) { }

  ngOnInit() {
    this.strapiProposalId = +this.activatedRoute.snapshot.params['strapiProposalId'];
    if(this.strapiProposalId > 0)
      this.getAllRequstsByProposalId();
  }


  getAllRequstsByProposalId() {
    this.requestsService.getRequestsByStrapiProposalId(this.strapiProposalId).subscribe((res: any) => {
      if (res) {
        this.requests = res.requests;
        this.proposalProfile = res;
        console.log(this.proposalProfile);
        
      }
    })
  }

  goToDeal() {
    this.requestsService.goToDeal(this.strapiProposalId).subscribe((res: any) => {
      if (res) {
        
        this.proposalProfile = res;
        this.requests = res.requests;
        let message = "Статус был успешно обновлен";     
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              icon: "thumb_up_white",
              timeout: 4500,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);

      }
    })
  }



  goToFinish() {
    this.requestsService.goToFinish(this.strapiProposalId).subscribe((res: any) => {
      if (res) {
        
        this.proposalProfile = res;
        this.requests = res.requests;
        let message = "Статус был успешно обновлен! страница перезагрузится через 5 секунд.";     
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              icon: "thumb_up_white",
              timeout: 4500,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    })
  }

  goToRollback() {
    this.requestsService.goToRollback(this.strapiProposalId).subscribe((res: any) => {
      if (res) {
        
        this.proposalProfile = res;
        this.requests = res.requests;
        let message = "Статус был успешно обновлен! страница перезагрузится через 5 секунд.";     
        let alertSettings: IAlertSettings = {
              message: message,
              icon: "thumb_up_white",
              timeout: 4500,
              isVisible: true,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    })
  }

}
