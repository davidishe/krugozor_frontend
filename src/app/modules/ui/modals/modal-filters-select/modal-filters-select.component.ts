import { Component, OnInit } from '@angular/core';
import { IPopoverData } from '../../popover/popover';
import { Observable } from 'rxjs';
import { ProposalsService } from 'src/app/services/proposals.service';
import { PopoverService } from '../../popover/popover.service';
import { ICity } from 'src/app/models/main/city';
import { ICountry } from 'src/app/models/main/country';
import { QueryParams } from 'src/app/models/main/query-params';



@Component({
  selector: 'app-modal-filters-select',
  templateUrl: './modal-filters-select.component.html',
  styleUrls: ['./modal-filters-select.component.css']
})
export class ModalFiltersSelectComponent implements OnInit {

  popoverState$!: Observable<IPopoverData | null>;
  cities$!: Observable<ICity[]>;
  countrys$!: Observable<ICountry[]>;
  queryParams$!: Observable<QueryParams | null>; 
  proposalTypes$!: Observable<any[]>;
  amenities$!: Observable<any[]>;
  citiesForDropDown: any[] = [];

  constructor(
    private popoverService: PopoverService,
    public proposalService: ProposalsService,
  ) {

  }

  ngOnInit() {
    this.popoverState$ = this.popoverService.popoverState$;
    this.queryParams$ = this.proposalService.queryParams$;
    this.cities$ = this.proposalService.citys$;
    this.countrys$ = this.proposalService.countrys$;
    this.proposalTypes$ = this.proposalService.proposalTypes$;
    // this.proposalService.getQueryParams().isRealBussinessEnabled;
    this.amenities$ = this.proposalService.amenities$;

    this.setIsRealBussinessDefaultState();
  }

  setCountrys(event: any, country: any, params: QueryParams) {
    
    const isChecked = event.param1.target.checked;

    if(isChecked) {
      params.selectedCountries.push(country);
      this.citiesForDropDown = this.citiesForDropDown.concat(country.attributes.cities.data);
    }

    if(!isChecked) {
      params.selectedCountries = params.selectedCountries.filter(z => z.id !== country.id);
      country.attributes.cities.data.forEach((city: any) => {
        this.citiesForDropDown = this.citiesForDropDown.filter(z => z.id !== city.id);
      });
    }

    this.proposalService.setQueryParams(params);
    
  }


  removeSpecificCity(city: ICity) {
    const params = this.proposalService.getQueryParams();
    params!.selectedCities = params!.selectedCities.filter(z => z.id !== city.id);
    if(params)
      this.proposalService.setQueryParams(params);
  }


  getStatus(country: ICountry, array: Array<any>): boolean | void {
    const isExist = array.filter(z => +z.id === +country.id).length;
    if (isExist === 0)
      return false;

    if (isExist > 0)
      return true;
  }


  setIsRealBussinessEnabled(event: any) {
    console.log(event);
    let params = this.proposalService.getQueryParams();
    params!.isRealBussinessEnabled = event;
  }

  setIsRealBussinessDefaultState() {
    // const params = this.proposalService.getQueryParams().isRealBussinessEnabled;
  }


  isDisabled(id: number) {
    return false;
    const params = this.proposalService.getQueryParams();
    if(params!.defaultCountryId === id)
      return true;
  }



  submitSearch() {
    const params = this.proposalService.getQueryParams();
    if(params)
      this.proposalService.setQueryParams(params);
    this.popoverService.closePopover();
    this.proposalService.getAllDataWithGQL();
  }


  ngAfterViewChecked(): void {

  }








}
