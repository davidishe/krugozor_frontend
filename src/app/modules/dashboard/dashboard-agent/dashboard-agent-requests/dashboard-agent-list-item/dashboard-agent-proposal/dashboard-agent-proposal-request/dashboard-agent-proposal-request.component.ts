import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from 'src/app/modules/dashboard/requests/requests.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { PopoverTypes } from 'src/app/modules/ui/popover/popover-type';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-dashboard-agent-proposal-request',
  templateUrl: './dashboard-agent-proposal-request.component.html',
  styleUrls: ['./dashboard-agent-proposal-request.component.css']
})
export class DashboardAgentProposalRequestComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() isPending: boolean;
  form!: FormGroup;
  strapiProposalId: number;
  requestId: number;
  request: any;
  proposalProfile: any;


  constructor(
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private alertService: TwAlertService,
    private requestService: RequestsService,
    private popoverService: PopoverService
  ) { }


  ngOnInit() {
    this.strapiProposalId = +this.activatedRoute.snapshot.params['strapiProposalId'];
    this.requestId = +this.activatedRoute.snapshot.params['requestId'];
    this.getCurrentRequest();

    if(this.strapiProposalId > 0)
      this.getCurrenProposalProfile();
    
  }


  getCurrenProposalProfile() {
    this.requestService.getRequestsByStrapiProposalId(this.strapiProposalId).subscribe((res: any) => {
      if (res) {
        this.proposalProfile = res;
      }
    })
  }


  getCurrentRequest() {
    this.orderService.getById(this.requestId).subscribe((res: any) => {
      if (res) {
        
        this.request = res;
      }
    })
  }


  changeRequstToStatus(statusId: number) {
    this.orderService.changeOrderStatusById(this.requestId, statusId).subscribe((res: any) => {
      if (res) {
        this.request = res;
        this.onMessage();
      }
    })
  }

  changeValue(event) {
    console.log(event);
    this.request.shareValue = event;
  }


  onMessage() {
    let message = "Статус заявки успешно обновлен";     
    let alertSettings: IAlertSettings = {
          isVisible: true,
          message: message,
          icon: "thumb_up_white",
          timeout: 4500,
          color: IAlertType.green
    };
    this.alertService.apearAlert(alertSettings);
  }


  goToChangeRequstAmmount() {
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData.blackWrapper = true;
    popoverData.status = true;
    popoverData.popoverType = PopoverTypes.pledge_change;
    popoverData.data.push(this.strapiProposalId);
    popoverData.data.push(this.requestId);
    this.popoverService.setPopoverStatus(popoverData);
  }

}
