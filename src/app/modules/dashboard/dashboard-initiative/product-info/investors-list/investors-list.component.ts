import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '../../../requests/requests.service';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { PopoverTypes } from 'src/app/modules/ui/popover/popover-type';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.scss']
})
export class InvestorsListComponent implements OnInit {

  @Input() proposalProfile: any;
  @Input() strapiProposal: any;
  @Input() requests: any[];
  isSubmitted = false;



  constructor(
    private requestService: RequestsService,
    private authService: AuthService,
    private popoverService: PopoverService,
    private alertService: TwAlertService
  ) { }


  ngOnInit() {   
  }

  openRequestForInvestment() {
    // проверяем авторизован ли пользователь
    const isLogged = this.authService.logedIn();
    if(isLogged === false) {
      // показываем модалку с необходимостью авторизоваться
      const popoverData = this.popoverService.getPopoverStatus();
      popoverData.popoverType = PopoverTypes.get_auth;
      popoverData.status = true;
      popoverData.blackWrapper = true;
      this.popoverService.setPopoverStatus(popoverData);
      return;
    }

    const user = this.authService.getCurrentUserValue();
    if(user.isAgency) {
        let message = "Ты зарегистрирован как агентство недвижимости";
        let secondMessage = "Покупать недвижимость могут только физические лица!"
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              secondMessage: secondMessage,
              icon: "thumb_up_white",
              timeout: 3500,
              color: IAlertType.red
      };
      this.alertService.apearAlert(alertSettings);
      return;
    }

    // можно участвовать в покупке, если пользователь авторизован
    const popoverStatus = this.popoverService.getPopoverStatus();
    popoverStatus.blackWrapper =true;
    popoverStatus.popoverType = PopoverTypes.pledge;
    popoverStatus.status = true;
    this.popoverService.setPopoverStatus(popoverStatus);
  }

  addNewRequest(request) {
    if (this.proposalProfile === undefined || this.proposalProfile === null) {
      this.requests = [];  
      this.requests.push(request);
      return;
    }

    console.log(this.requests);
    this.requests.push(request);


  }






}




