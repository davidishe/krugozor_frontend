import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { IPopoverData } from 'src/app/modules/ui/popover/popover';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';
import { RequestsService } from '../../requests/requests.service';
import { IRequest } from '../../requests/requests.models';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-create-pledge',
  templateUrl: './create-pledge.component.html',
  styleUrls: ['./create-pledge.component.css']
})
export class CreatePledgeComponent implements OnInit {

  popoverState$: Observable<IPopoverData>;
  form!: FormGroup;
  minInvestValue: number;
  maxInvestValue: number;
  // maxInvestValueLength: number;

  @Input() strapiProposal: any;
  @Output() eventEmitter = new EventEmitter<IRequest>();

  constructor(
    private popoverService: PopoverService,
    private requestService: RequestsService,
    private alertService: TwAlertService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.popoverState$ = this.popoverService.popoverState$;
    this.getProposalProfileLimits();    
  }


  createForm() {
    this.form = new FormGroup({
          investAmmount: new FormControl(null, [Validators.required])
        },
    );
    this.form.get['investAmmount']?.setValidators([Validators.min(this.minInvestValue), Validators.max(this.maxInvestValue), Validators.required]);
    
  }

  makeRequestForInvestment() {
    const shareValue = this.form.get('investAmmount').value;
    this.requestService.addRequestToProfile(this.strapiProposal.data.id, shareValue).subscribe((res: any) => {
      if (res) {
        this.eventEmitter.emit(res);
        this.popoverService.closePopover();
        this.form.reset();
        let message = "Заявка успешно отправлена в агентство! С вами свяжутся в ближайшее время.";
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

  getProposalProfileLimits() {
    this.requestService.getProposalProfileLimits(this.strapiProposal.data.id).subscribe((res: any) => {
      if (res) {
        this.maxInvestValue = res.max;
        this.minInvestValue = res.min;
        this.createForm();
      }
    })
  };

  restrictMaxLength(value: string) {
    this.form.get('investAmmount')!.patchValue(value.slice(0, 5));
  }

  close() {
    this.popoverService.closePopover();
  }

}
