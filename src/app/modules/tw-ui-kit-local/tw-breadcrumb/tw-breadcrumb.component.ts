import { Component, Input, OnInit } from '@angular/core';
import { QueryParams } from 'src/app/models/main/query-params';
import { ProposalsService } from 'src/app/services/proposals.service';
import { PopoverService } from '../../ui/popover/popover.service';

@Component({
  selector: 'app-tw-breadcrumb',
  templateUrl: './tw-breadcrumb.component.html',
  styleUrls: ['./tw-breadcrumb.component.scss']
})
export class TwBreadcrumbComponent implements OnInit {
  @Input() categorys: any[];
  params: QueryParams;
  
  constructor(
    private proposalService: ProposalsService,
    private popoverService: PopoverService 
  ) { }

  ngOnInit() {
    this.params = this.proposalService.getQueryParams();
  }

  goToCategorySection(category: any) {
    const params = this.proposalService.getQueryParams();
    const index = params.categorys.indexOf(category);
    params.categorys = params.categorys.filter(z => this.params.categorys.indexOf(z) <= index);
    params.curentCategorysLevel = index;
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
    
  }


}
