import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IStrapiAbstractFieldDto, IStrapiDto } from 'src/app/models/main/dtos';
import { ProposalsService } from 'src/app/services/proposals.service';
import { MyProposalsService } from '../../dashboard-agent-proposals.service';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';

@Component({
  selector: 'app-my-proposal-page-custom-filters',
  templateUrl: './my-proposal-page-custom-filters.component.html',
  styleUrls: ['./my-proposal-page-custom-filters.component.css']
})
export class MyProposalPageCustomFiltersComponent implements OnInit {

  @Input() currentProposal: any;
  queryParams$: Observable<any>;
  // citiesForDropDown: ICity[] = [];
  @Input() selectedFilters: any[] = [];
  @Input() allFiltersForSelect: any[];
  @Input() title: string;
  @Input() isPending: boolean;
  @Output() eventEmitter = new EventEmitter<any>();



  constructor(
    private proposalService: ProposalsService,
    private myProposalsService: MyProposalsService,
    private alertService: TwAlertService
  ) { }

  ngOnInit() {
  }



  isSelected(item: any): boolean {
    const selectedCountryResult = this.selectedFilters.filter(z => +z.id === +item.id);
    if(selectedCountryResult.length > 0)
      return true;
    else
      return false;
  }

  setItem(event: any, item: any) {
    const isChecked = event.param1.target.checked;

    if(isChecked)
      this.selectedFilters.push(item);

    if(!isChecked)
      this.selectedFilters = this.selectedFilters.filter(z => z.id !== item.id);


  }



  updateData() {
    this.isPending = true;

    const specialFilters: IStrapiAbstractFieldDto[] = [];
    this.selectedFilters.forEach(city => {
      specialFilters.push({ id: city.id });
    });

    this.eventEmitter.emit(specialFilters);

    setTimeout(() => {
      this.alertService.apearAlert("Данные успешно сохранены", "green", "thumb_up_white", 3500);
      this.isPending = false;
    }, 2000);


    
  }

}
