import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProposalsService } from 'src/app/services/proposals.service';
import { IStrapiDto } from 'src/app/models/main/dtos';
import { StrapiService } from 'src/app/services/strapi.service';
import { MyProposalsService } from '../dashboard-agent-proposals.service';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';
import { AgentService } from '../../dashboard-agent-requests/agent.service';

@Component({
  selector: 'app-dashboard-agent-proposal-edit',
  templateUrl: './dashboard-agent-proposal-edit.component.html',
  styleUrls: ['./dashboard-agent-proposal-edit.component.scss']
})
export class DashboardAgentProposalEditComponent implements OnInit {


  currentProposal: any;
  currentProfile: any;
  proposalId: number;
  sub: Subscription;
  form!: FormGroup;
  isPending: boolean = false;
  isLoading: boolean = true;
  isPublished: boolean;


  constructor(
    private proposalService: ProposalsService,
    private strapiService: StrapiService,
    private myProposalService: MyProposalsService,
    private activatedRoute: ActivatedRoute,
    private alertService: TwAlertService,
    private agentService: AgentService
  ) { }



  ngOnInit(
  ) {
    this.createForm();
    this.proposalId = +this.activatedRoute.snapshot.params['proposalId'];

    if (this.proposalId > 0) {
      this.getStrapiProposal();
      this.getProposalProfile();
    }
  }


  getStrapiProposal() {
    this.sub = this.proposalService.getItemById(this.proposalId)?.subscribe((res: any) => {
      if (res) {

        this.currentProposal = res;
        this.patchFromWithValues();
        this.isLoading = false;
        this.isPublished = !this.currentProposal?.data?.attributes?.isPublished;
      }
    });
  }


  setIsRealBussinessEnabled(event: boolean) {
    this.currentProposal.data.attributes.isRealBusinessEnable = event;
  }


  patchFromWithValues() {
    this.form.get('description')!.patchValue(this.currentProposal.data.attributes.description);
    this.form.get('name')!.patchValue(this.currentProposal.data.attributes.name);
    this.form.get('price')!.patchValue(this.currentProposal.data.attributes.price);
    this.form.get('address')!.patchValue(this.currentProposal.data.attributes.address);
    this.form.get('placeArea')!.patchValue(this.currentProposal.data.attributes.placeArea);
    this.form.get('buildYear')!.patchValue(this.currentProposal.data.attributes.buildYear);
    this.form.get('bedsQuantity')!.patchValue(this.currentProposal.data.attributes.bedsQuantity);
    this.form.get('electricityPower')!.patchValue(this.currentProposal.data.attributes.electricityPower);
  }


  createForm() {
    this.form = new FormGroup(
      {
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
        placeArea: new FormControl(null, [Validators.required]),
        buildYear: new FormControl(null, [Validators.required]),
        bedsQuantity: new FormControl(null, []),
        electricityPower: new FormControl(null, []),
      },
    );
  }

  updateMainData() {
    this.isPending = true;
    const value: IStrapiDto = this.form.value;
    value.strapiProposalId = +this.proposalId;
    console.log(this.form.value);
    value.isRealBusinessEnable = this.currentProposal.data.attributes.isRealBusinessEnable;

    this.myProposalService.createOrUpdateItemWithStrapi(value).subscribe((res: any) => {
      if (res) {
        const newProposal = JSON.parse(res.content);
        this.currentProposal.data.attributes.name = newProposal.data.attributes.name;
        this.isPending = false;
        this.messageOnUpdate();
      }
    })

  }


  getProposalProfile() {
    this.agentService.getProfileByStrapiProposalId(this.proposalId).subscribe((res: any) => {
      if (res) {

        this.currentProfile = res;
      }
    })
  }


  draftProposal() {
    this.strapiService.draftProposal(this.proposalId).subscribe((res: any) => {
      if (res) {
        this.isPublished = false;
        this.messageOnUpdate();
      }
    })
  }

  publishProposal() {
    this.strapiService.publishProposal(this.proposalId).subscribe((res: any) => {
      if (res) {

        this.isPublished = true;
        this.messageOnUpdate();
      }
    })
  }


  private messageOnUpdate() {
    let message = "Данные успешно обновлены!"
    let secondMessage = "Можете продолжить работу на платформе."
    let settings: IAlertSettings = {
      isVisible: true,
      message: message,
      secondMessage: secondMessage,
      icon: "thumb_up_white",
      timeout: 6500,
      color: IAlertType.info
    }
    this.alertService.apearAlert(settings);
  }


  isSectionVisible(currentProposal: any, step: number): boolean {
    if (step === 1) {
      console.log(currentProposal.data.attributes);
    }
    return true;
  }

}
