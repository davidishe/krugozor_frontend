import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/main/city';
import { QueryParams } from 'src/app/models/main/query-params';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss']
})
export class FiltersContentComponent implements OnInit {

  selectedCitys$: Observable<any[]>;
  queryParams$: Observable<QueryParams>;
  citys$: Observable<ICity[]>;

  constructor(
    private proposalService: ProposalsService
  ) { }


  ngOnInit() {

    this.selectedCitys$ = this.proposalService.queryParamsForCity$;
    this.queryParams$ = this.proposalService.queryParams$;
    this.citys$ = this.proposalService.citys$;

  }


  checkboxChanged(event: any) {
    if(event.param1.target.checked && event.param2 === 1)
    {
      const id = event.param1.target.id;
      // const QUERY: QueryParams = {
      //   id: id,
      //   text: 'ааа'
      // };
      // this.proposalService.setCityParamValue(QUERY);
      this.proposalService.setPaginationPageNumber(1);
      this.proposalService.getAllData();
    }

    if(!event.param1.target.checked && event.param2 === 1)
    {
      this.proposalService.removeQueryCityParam(event.param1.target.id);
      this.proposalService.setPaginationPageNumber(1);
      this.proposalService.getAllData();
    }


    if(event.param1.target.checked && event.param2 === 2)
    {
      // const id: string = event.param1.target.id;
      // const PARSED_ID = id.toString().replace('_lang', '');
      // const QUERY: QueryParams = {
      //   id: +PARSED_ID,
      //   text: 'ааа'
      // };
      // // this.proposalService.setLangParam(QUERY);
      // this.proposalService.setPaginationPageNumber(1);
      // this.proposalService.getAllData();
    }

    if(!event.param1.target.checked && event.param2 === 2)
    {
      const id: string = event.param1.target.id;
      const PARSED_ID = id.toString().replace('_lang', '');
      // this.proposalService.removeQueryLangParam(PARSED_ID);
      this.proposalService.setPaginationPageNumber(1);
      this.proposalService.getAllData();
    }



    if(event.param1.target.checked && event.param2 === 3)
    {
    //   const id: string = event.param1.target.id;

    //   const PARSED_ID = id.toString().replace('_rating_type', '');
    //   const QUERY: QueryParams = {
    //     id: +PARSED_ID,
    //     text: 'ааа'
    //   };
    //   this.proposalService.setQuerParamForRating(QUERY);
    //   this.proposalService.setPaginationPageNumber(1);
    //   this.proposalService.getAllData();
    // }

    // if(!event.param1.target.checked && event.param2 === 3)
    // {
    //   const id: string = event.param1.target.id;
    //   const PARSED_ID = id.toString().replace('_rating_type', '');
    //   this.proposalService.removeQueryParamForRating(PARSED_ID);
    //   this.proposalService.setPaginationPageNumber(1);
    //   this.proposalService.getAllData();
    }


    if(event.param1.target.checked && event.param2 === 4)
    {
      // const id: string = event.param1.target.id;

      // const PARSED_ID = id.toString().replace('_verify_type', '');
      // const params = this.proposalService.getQueryParams();
      // const QUERY: QueryParams = {
      //   id: +PARSED_ID,
      //   text: 'ааа'
      // };
      // this.proposalService.setQuerParamForVerification(QUERY);
      // this.proposalService.setPaginationPageNumber(1);
      // this.proposalService.getAllData();
    }

    if(!event.param1.target.checked && event.param2 === 4)
    {
      const id: string = event.param1.target.id;
      const PARSED_ID = id.toString().replace('_verify_type', '');
      this.proposalService.removeQueryParamForVerification(PARSED_ID);
      this.proposalService.setPaginationPageNumber(1);
      this.proposalService.getAllData();
    }

  

    
  }


  getStatus(id: number, array: Array<any>): boolean {
    const isExist = array.filter(z => +z.id === +id).length;
    if (isExist === 0) {
      return false;
    }
    if (isExist > 0) {
      return true;
    }
  }


  removeCategoryBadge(value: QueryParams) {
    console.log(value);
    this.proposalService.removeQueryCategoryValue();
    this.proposalService.setPaginationPageNumber(1);
    this.proposalService.getAllData();
  }


  removeLangParam(langId: string) {
    const params = this.proposalService.getQueryParams();
    params.currentLangCode = langId;
    this.proposalService.setQueryParams(params);
    this.proposalService.setPaginationPageNumber(1);
    this.proposalService.getAllData();
  }



}
