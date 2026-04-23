import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICity } from 'src/app/models/main/city';
import { ProposalsService } from 'src/app/services/proposals.service';
import { PopoverService } from '../../ui/popover/popover.service';
import { Observable } from 'rxjs';
import { QueryParams } from 'src/app/models/main/query-params';
import { PopoverTypes } from '../../ui/popover/popover-type';

@Component({
  selector: 'app-tw-input-search',
  templateUrl: './tw-input-search.component.html',
  styleUrls: ['./tw-input-search.component.scss']
})
export class TwInputSearchComponent implements OnInit, AfterViewChecked {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type?: string;
  @Input() control_name!: string;
  @Input() form!: FormGroup;
  @Input() items!:  ICity[];
  @Input() isItemAvailable!: boolean;
  @Input() isFocused!: boolean;
  @Input() activateLabel!: boolean;
  @Output() notify = new EventEmitter<any>();
  @Input() value!: string;
  params$!: Observable<QueryParams>;


  selected_items: any[] = [];
  initial_items: any[] = [];


  @ViewChild('input_autocomplete', {static: true}) input_autocomplete!: ElementRef;


  constructor(
    public proposalService: ProposalsService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private popoverService: PopoverService,
  ) {
  }


  onChanged(changes: SimpleChanges) {
    if (this.form.get('search')!.value)
      this.isItemAvailable = true;

    if (!this.form.get('search')!.value)
      this.isItemAvailable = false;       
      
  }


  searchTextGQL(event: any) {
    const valueForSearch = this.form.get('search')!.value;
    let params = this.proposalService.getQueryParams();
    params!.text = valueForSearch;
    // params.defaultState = false;
    if(params)
      this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
  }




  ngOnInit() {
    this.selected_items = this.items;
    this.initial_items = this.items;
    const params = this.proposalService.getQueryParams();
    this.form.get('search')!.patchValue(params.text)
  };


  closeSearch(): void {
    this.form.get('search')!.patchValue('');
    let params = this.proposalService.getQueryParams();
    params.text = '';
    this.proposalService.setQueryParams(params);    


    const isParamsEmpty = this.proposalService.isAnythingInFiltersAdded();
    if(isParamsEmpty === false) {
      // params.defaultState = true;
      this.proposalService.setQueryParams(params);
    }

    this.proposalService.getAllDataWithGQL();
    this.isItemAvailable = false;
    this.cdr.detectChanges();
  }



  toggleFiltersModal() {
    console.log(1238899);
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData.blackWrapper = true;
    popoverData.status = true;
    popoverData.popoverType = PopoverTypes.filters;
    this.popoverService.setPopoverStatus(popoverData);
  }

  ngAfterViewChecked(): void {
  }

}