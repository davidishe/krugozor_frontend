import { Component, Input, OnInit } from '@angular/core';
import { QueryParams } from 'src/app/models/main/query-params';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-potential-using',
  templateUrl: './potential-using.component.html',
  styleUrls: ['./potential-using.component.css']
})
export class PotentialUsingComponent implements OnInit {
  
  @Input() items!: any[];
  @Input() queryParams!: QueryParams;
  
  constructor(
    private proposalService: ProposalsService
  ) { }

  ngOnInit() {
  }

  getStatus(item: any, array: Array<any>): boolean | void {
    const isExist = array.filter(z => +z.id === +item.id).length;
    if (isExist === 0)
      return false;

    if (isExist > 0)
      return true;
  }

  isDisabled() {
    return false;
  }

  setItem(event: any, country: any) {
    const isChecked = event.param1.target.checked;

    if(isChecked) {
      this.queryParams.selectedProposalTypes.push(country);
    }

    if(!isChecked) {
      this.queryParams.selectedProposalTypes = this.queryParams.selectedProposalTypes.filter(z => z.id !== country.id);
    }

    this.proposalService.setQueryParams(this.queryParams);
  }

  
}
