import { AfterContentInit, AfterViewChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestsService } from 'src/app/modules/dashboard/requests/requests.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IPopoverData } from 'src/app/modules/ui/popover/popover';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';

@Component({
  selector: 'app-dashboard-agent-proposal-request-change',
  templateUrl: './dashboard-agent-proposal-request-change.component.html',
  styleUrls: ['./dashboard-agent-proposal-request-change.component.css']
})

export class DashboardAgentProposalRequestChangeComponent implements OnInit, AfterViewChecked {

  popoverState$: Observable<IPopoverData>;
  form!: FormGroup;  
  minInvestValue: number;
  maxInvestValue: number;
  limitIsAdded: boolean = false;
  @Output() changeValue = new EventEmitter<any>();

  constructor(
    private requestService: RequestsService,
    private activatedRoute: ActivatedRoute,
    private alertService: TwAlertService,
    private popoverService: PopoverService
  ) { }


  ngOnInit() {
    this.popoverState$ = this.popoverService.popoverState$;
    this.createForm();
  }


  changeRequestAmmount() {
    const shareValue = this.form.get('investAmmount').value;
    const requestId = this.popoverService.getPopoverStatus().data[1];
    this.requestService.changeRequestAmmount(requestId, shareValue).subscribe((res: any) => {
      if (res) {
        this.changeValue.emit(res.shareValue);
        let message = "Данные успешно сохранены!";     
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              secondMessage: "Страница обновится через 3 секунды",
              icon: "thumb_up_white",
              timeout: 2000,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        this.popoverService.closePopover();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    })
  }


  createForm() {
    this.form = new FormGroup({
          investAmmount: new FormControl(null, [Validators?.required])
        },
    );    
  }


  close() {
    this.popoverService.closePopover();
  }


  getProposalProfileLimits() {
    this.limitIsAdded = true;
    const data = this.popoverService.getPopoverStatus();
    this.requestService.getProposalProfileLimits(data.data[0]).subscribe((res: any) => {
      if (res) {
        this.maxInvestValue = res.max;
        this.minInvestValue = res.min;
        this.form.get('investAmmount').setValidators([Validators.min(+this.minInvestValue), Validators.max(+this.maxInvestValue), Validators.required]);
      }
    })

  };


  ngAfterViewChecked(): void {
    if (this.limitIsAdded)
      return;
  
    const data = this.popoverService.getPopoverStatus().data;
    if(data.length > 0)
      this.getProposalProfileLimits();

  }


}
