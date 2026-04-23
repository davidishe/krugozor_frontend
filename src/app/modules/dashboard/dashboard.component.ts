import { Component, OnInit } from '@angular/core';
import { QueryParams } from 'src/app/models/main/query-params';
import { ProposalsService } from 'src/app/services/proposals.service';
import { IPagination } from 'src/app/models/main/pagination';
import { FavourService } from 'src/app/services/favour.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  constructor(
    private proposalService: ProposalsService,
    private favourService: FavourService
  ) {
    
  }


  ngOnInit(): void {
    // getFromQueryParams in ?query url
    const params: QueryParams = {
      id: 0,
      text: '',
      currentLangCode: 'ru',
      minimalPrice: 0,
      maximalPrice: 0,
      isDescending: false,
      isAscending: false,
      categorys: [],
      selectedCities: [],
      selectedCountries: [],
      selectedProposalTypes: [],
      selectedAmenities: [],
      defaultCountryId: 1,
      isRealBussinessEnabled: false,
      curentCategorysLevel: 0,
      isPending: false,
      maxPlaceArea: 0,
      minPlaceArea: 0,
      maxBuildingYear: 0,
      minBuildingYear: 0
    }
    this.proposalService.setQueryParams(params);

    

    const pagination: IPagination = {
      page: 1,
      pageSize: 25
    };

    this.proposalService.setPaginationValue(pagination);


    this.proposalService.getCatalogCategoryesGQL();
    this.proposalService.getCountrys();
    this.proposalService.getCitys();
    this.proposalService.getAllDataWithGQL();
    this.proposalService.getAmenitites();
    this.favourService.getAllFavoursForUser();

    

    
  }







}
