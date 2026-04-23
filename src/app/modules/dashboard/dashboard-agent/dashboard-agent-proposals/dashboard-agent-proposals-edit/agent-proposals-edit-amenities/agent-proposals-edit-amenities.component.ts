import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProposalsService } from 'src/app/services/proposals.service';
import { MyProposalsService } from '../../dashboard-agent-proposals.service';
import { IStrapiDto } from 'src/app/models/main/dtos';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';

@Component({
  selector: 'app-agent-proposals-edit-amenities',
  templateUrl: './agent-proposals-edit-amenities.component.html',
  styleUrls: ['./agent-proposals-edit-amenities.component.css']
})
export class DashboardAgentProposalsEditAmenitiesComponent implements OnInit {

  @Input()  currentProposal: any;
  selectedItems: any[] = [];
  itemsForSubmit: any[] = [];
  proposalAmenities$: Observable<any[]>;
  proposalAmenitiesForSelect: any[] = [];
  isRemoved: boolean = false;
  isPending: boolean = false;
  allTypes: any[] = [];


  constructor(
    private proposalService: ProposalsService,
    private alertService: TwAlertService,
    private myProposalService: MyProposalsService
  ) { }

  ngOnInit() {
    this.proposalService.amenities$.subscribe((res: any) => {
      if (res) {
        this.allTypes = res;
      }
    });
    this.selectedItems = this.currentProposal.data.attributes.amenities.data;
  }

  updateDataToServer() {
    if(this.isPending)
      return;

    this.isPending = true;

    this.itemsForSubmit = this.selectedItems;
    
    const strapiDto: IStrapiDto = {
      strapiProposalId: this.currentProposal.data.id,
      name: this.currentProposal.data.attributes.name,
      description: this.currentProposal.data.attributes.description,
      price: this.currentProposal.data.attributes.price,
      amenities: this.itemsForSubmit
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

  addItem(type: any) {
    console.log(type);
    this.selectedItems.push(type);
  }


  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(z => +z.id !== +item.id);
  }


}
