import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/main/city';
import { ICategoryParam, QueryParams } from 'src/app/models/main/query-params';
import { IPopoverData } from 'src/app/modules/ui/popover/popover';
import { PopoverTypes } from 'src/app/modules/ui/popover/popover-type';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-dashboard-list-filters-workspace',
  templateUrl: './dashboard-list-filters-workspace.component.html',
  styleUrls: ['./dashboard-list-filters-workspace.component.scss']
})
export class DashboardListFiltersWorkspaceComponent implements OnInit {

  form!: FormGroup;
  categorys$: Observable<QueryParams[]>;
  queryParams$: Observable<QueryParams>;
  popoverState$: Observable<IPopoverData>;
  responseData$: Observable<any>;

  constructor(
    public proposalService: ProposalsService,
    private popoverService: PopoverService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createForm();
    this.categorys$ = this.proposalService.proposalTypes$;
    this.queryParams$ = this.proposalService.queryParams$;
    this.popoverState$ = this.popoverService.popoverState$;
    this.responseData$ = this.proposalService.responseData$;
  }


  setCategory(item: any) {
    const params = this.proposalService.getQueryParams();
    params.curentCategorysLevel = params.curentCategorysLevel + 1;

    // console.log(item);

    let category: ICategoryParam = {
      id: item.id,
      name: item.attributes.name,
      attributes: item.attributes,
    };

    params.categorys.push(category);
    // params.defaultState = false;
    params.isPending = true;
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();

  }

  // this.router.navigate([], 
  // {
  //   relativeTo: this.activatedRoute,
  //   queryParams: { categorys: JSON.stringify(params.categorys) },
  //   // queryParamsHandling: 'preserve'
  // });


  toggleFiltersModal() {
    console.log(1238899);
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData.blackWrapper = true;
    popoverData.status = true;
    popoverData.popoverType = PopoverTypes.filters;
    this.popoverService.setPopoverStatus(popoverData);
  }


  createForm() {
    this.form = new FormGroup({
      search: new FormControl(null,
        [Validators.required])
    });
  }


  cleanFilters(): void {
    this.proposalService.cleanAllFilters();
  }




  removeDescendingSort() {
    const params = this.proposalService.getQueryParams();
    params.isDescending = false;
    this.proposalService.setQueryParams(params);

    if (this.proposalService.isQueryEmpty()) {
      // params.defaultState = true;
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
  }

  removeIsBussinessEnabled() {
    const params = this.proposalService.getQueryParams();
    params.isRealBussinessEnabled = false;
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
  }

  removeAscendingSort() {
    const params = this.proposalService.getQueryParams();
    params.isAscending = false;
    this.proposalService.setQueryParams(params);

    if (this.proposalService.isQueryEmpty()) {
      // params.defaultState = true;
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
  }



  closeSearchText(): void {
    this.form.get('search')!.patchValue('');
    let params = this.proposalService.getQueryParams();
    // if(params.categorys.length === 0)
    //   params.defaultState = true;

    params.text = '';
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
    this.cdr.detectChanges();
  }

  getFiltersStatus() {
    const params = this.proposalService.getQueryParams();
    if (params.categorys.length === 0 && params.text.length === 0)
      return false;

    else
      return true;
  }


  removeSpecificCity(city: ICity) {
    const params = this.proposalService.getQueryParams();
    params.selectedCities = params.selectedCities.filter(z => z.id !== city.id);
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
  }


  removeSelectedProposalType(type: any) {
    const params = this.proposalService.getQueryParams();
    params.selectedProposalTypes = params.selectedProposalTypes.filter(z => z.id !== type.id);
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
  }


  removeSelectedAmenitie(type: any) {
    const params = this.proposalService.getQueryParams();
    params.selectedAmenities = params.selectedAmenities.filter(z => z.id !== type.id);
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
  }


  deleteMaximalPrice() {
    const params = this.proposalService.getQueryParams()
    params.maximalPrice = 0;
    this.proposalService.setQueryParams(params);

    if (this.proposalService.isQueryEmpty()) {
      // params.defaultState = true;
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
  }

  deleteMinimalPrice() {
    const params = this.proposalService.getQueryParams()
    params.minimalPrice = 0;
    this.proposalService.setQueryParams(params);

    if (this.proposalService.isQueryEmpty()) {
      // params.defaultState = true;
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
  }



  deleteMaximalAreaPlace() {
    const params = this.proposalService.getQueryParams()
    params.maxPlaceArea = 0;
    this.proposalService.setQueryParams(params);

    if (this.proposalService.isQueryEmpty()) {
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
  }

  deleteMinimalAreaPlace() {
    const params = this.proposalService.getQueryParams()
    params.minPlaceArea = 0;
    this.proposalService.setQueryParams(params);

    if (this.proposalService.isQueryEmpty()) {
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
  }

}
