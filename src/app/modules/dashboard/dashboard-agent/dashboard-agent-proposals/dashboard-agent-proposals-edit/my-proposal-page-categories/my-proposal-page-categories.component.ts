import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryParam } from 'src/app/models/main/query-params';
import { ProposalsService } from 'src/app/services/proposals.service';
import { MyProposalsService } from '../../dashboard-agent-proposals.service';
import { IStrapiDto } from 'src/app/models/main/dtos';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';

@Component({
  selector: 'app-my-proposal-page-categories',
  templateUrl: './my-proposal-page-categories.component.html',
  styleUrls: ['./my-proposal-page-categories.component.css']
})
export class MyProposalPageCategoriesComponent implements OnInit {

  @Input()  currentProposal: any;
  selectedCategorys: ICategoryParam[] = [];
  categoriesForSubmit: ICategoryParam[] = [];
  proposalTypes$: Observable<ICategoryParam[]>;
  proposalTypesForSelect: any[] = [];
  isRemoved: boolean = false;
  isPending: boolean = false;
  allTypes: any[] = [];


  constructor(
    private proposalService: ProposalsService,
    private alertService: TwAlertService,
    private myProposalService: MyProposalsService
  ) { }

  ngOnInit() {
    this.proposalService.proposalTypes$.subscribe((res: any) => {
      if (res) {
        this.allTypes = res;
      }
    });
    this.selectedCategorys = this.currentProposal.data.attributes.proposal_types.data;
  }

  updateCategoriesData() {
    if(this.isPending)
      return;

    this.isPending = true;

    this.categoriesForSubmit = this.selectedCategorys;
    
    const strapiDto: IStrapiDto = {
      strapiProposalId: this.currentProposal.data.id,
      name: this.currentProposal.data.attributes.name,
      description: this.currentProposal.data.attributes.description,
      price: this.currentProposal.data.attributes.price,
      proposalTypes: this.categoriesForSubmit
    }


    this.myProposalService.createOrUpdateItemWithStrapi(strapiDto).subscribe((res: any) => {
      if (res) {
        let message = "Данные успешно сохранены";
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              icon: "thumb_up_white",
              timeout: 4500,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        this.isPending = false;
      }
    })
    
  }

  addItem(type: ICategoryParam) {
    console.log(type);
    this.selectedCategorys.push(type);
  }


  removeItem(item: ICategoryParam) {
    this.selectedCategorys = this.selectedCategorys.filter(z => +z.id !== +item.id);
  }


}
