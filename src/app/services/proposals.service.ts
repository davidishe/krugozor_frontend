import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../models/main/pagination';
import { QueryParams } from '../models/main/query-params';
import { IItem, IResponseData } from '../models/main/response';
import { PopoverService } from '../modules/ui/popover/popover.service';
import { ICity } from '../models/main/city';
import { ICountry } from '../models/main/country';
import { Apollo, gql } from "apollo-angular";
import CATEGORIES_QUERY from '../apollo/categories';
import AmenitiesQuery from '../apollo/amenities';
import { IStrapiData } from '../models/main/proposal';
import { IImageAttributes, IImageData, IImageResponse } from '../models/main/image';



@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

  strapiUrl = environment.strapiUrl;
  backendUri = environment.baseUri;

  private queryParamsSource = new BehaviorSubject<QueryParams | null>(null);
  queryParams$ = this.queryParamsSource.asObservable();

  private amenitiesSource = new BehaviorSubject<any[]>([]);
  amenities$ = this.amenitiesSource.asObservable();

  private proposalTypesSource = new BehaviorSubject<any[]>([]);
  proposalTypes$ = this.proposalTypesSource.asObservable();

  private responseDataSource = new BehaviorSubject<IItem[] | null>(null);
  responseData$ = this.responseDataSource.asObservable();

  private citysSource = new BehaviorSubject<ICity[]>([]);
  citys$ = this.citysSource.asObservable();

  private countrysSource = new BehaviorSubject<ICountry[]>([]);
  countrys$ = this.countrysSource.asObservable();

  private paginationSource = new BehaviorSubject<IPagination>({ pageSize: 25, page: 1 });
  pagination$ = this.paginationSource.asObservable();


  constructor(
    public http: HttpClient,
    private apollo: Apollo,
    private popoverService: PopoverService
  ) {
  }


  getQueryParams() {
    return this.queryParamsSource.value;
  }

  setQueryParams(queryParams: QueryParams) {
    let json = JSON.stringify(queryParams);
    localStorage.setItem('currentQueryParams', json);
    this.queryParamsSource.next(queryParams);
  }


  private GetCategoriesQueryUrl(): string {
    let params = this.getQueryParams();

    let index_1 = params!.categorys[0]?.id;

    let queryCatString: string = "";

    if (index_1 > 0) {
      queryCatString = queryCatString + "{categories: {id: {eq: " + index_1 + "}}},";
      return queryCatString;
    }

    else
      return "";
  }


  private getCitiesQueryUrl(): string {
    const params = this.getQueryParams();
    let result: string = "";

    params?.selectedCities.forEach(city => {
      result = result + city.id + ","
    });

    return "{cities: {id: {in: [" + result + "]}}}";
  }

  private getIsRealBussinessEnabled(): string {
    const params = this.getQueryParams();
    if (params!.isRealBussinessEnabled)
      return '{isRealBusinessEnable: {in: ' + params!.isRealBussinessEnabled + '}}';
    else
      return '';
  }


  private getSelectedProposalTypes(): string {
    let params = this.getQueryParams();
    let result: string = "";

    params!.selectedProposalTypes.forEach(type => {
      result = result + type.id + ","
    });
    return "{proposal_types: {id: {in: [" + result + "]}}}";
  }


  private getAmenitiesQueryString(): string {
    let params = this.getQueryParams();
    let result: string = "";

    params!.selectedAmenities.forEach(type => {
      result = result + type.id + ","
    });
    return "{amenities: {id: {in: [" + result + "]}}}";
  }


  private getPlaceAreaQueryString(): string {
    const params = this.getQueryParams();
    let result = '';
    if (+params!.minPlaceArea > 0)
      result = result += '{placeArea: {gte: ' + params!.minPlaceArea + '}}';

    if (+params!.maxPlaceArea > 0)
      result = result += '{placeArea: {lte: ' + params!.maxPlaceArea + '}}';
    return result;
  }

  private getBuildingYearQueryString(): string {
    const params = this.getQueryParams();
    let result = '';
    if (+params!.minBuildingYear > 0)
      result = result += '{buildYear: {gte: ' + params!.minBuildingYear + '}}';

    if (+params!.maxBuildingYear > 0)
      result = result += '{buildYear: {lte: ' + params!.maxBuildingYear + '}}';
    return result;
  }



  private getPricesQueryUrl(): string {
    const params = this.getQueryParams();

    let result: string = "";
    if (params!.maximalPrice > 0)
      result = result + "{price: {gte: " + params!.minimalPrice + "}}, ";

    if (params!.maximalPrice > 0)
      result = result + "{price: {lte: " + params!.maximalPrice + "}}";

    return result;
  }

  private getPriceSortingParams(): string {
    let result: string = "";
    let params = this.getQueryParams();
    if (params!.isAscending)
      result = "desc";

    else
      result = "asc";

    return result;
  }

  setPaginationValue(pagination: IPagination) {
    this.paginationSource.next(pagination);
  }

  getAllDataWithGQL() {
    let params = this.getQueryParams();
    params!.isPending = true;
    if (params)
      this.setQueryParams(params);

    let queryCatString: string = "";
    queryCatString = this.GetCategoriesQueryUrl();

    if (queryCatString === undefined)
      queryCatString = "";

    let citiesQueryUrl = this.getCitiesQueryUrl();
    let pricesQueryUrl = this.getPricesQueryUrl();
    let priceSortingParams = this.getPriceSortingParams();
    let placeAreaQueryString = this.getPlaceAreaQueryString();
    let isRealBussinessEnabled = this.getIsRealBussinessEnabled();
    let selectedProposalTypes = this.getSelectedProposalTypes();
    let buildingYearQueryString = this.getBuildingYearQueryString();
    let amenitiesQueryString = this.getAmenitiesQueryString();
    let isPublishedQueryUrl = '{ isPublished: { eq: true } }';
    const pagination = this.getCurrentPagination();

    console.log(1231);

    return this.http.get(this.backendUri + 'items/all').pipe(
      map((res: IItem[]) => {
        console.log(res);
        this.responseDataSource.next(res)
        let params = this.getQueryParams();
        params!.isPending = false;
        if (params)
          this.setQueryParams(params);
      }, (err: any) => {
      })
    ).subscribe((res: any) => {
      if (res) {
        return res;
      }
    })


    // 

    // this.setPaginationValue(data.attributes.proposals.meta.pagination);


  }


  getLocal(): string {
    const curentLang = localStorage.getItem('default_lang');



    if (curentLang!.includes('en'))
      return 'en';

    if (curentLang!.includes('geo'))
      return 'ka';

    else
      return 'ru';
  }


  getItemById(id: number) {
    // let locale = this.getLocal();
    return this.http.get<any>(this.backendUri + 'items/get_by_id/' + id);
  }


  getCategorysUrlFilter(): string {
    const params = this.getQueryParams();
    let result: string = '';
    return result;
  }


  getQueryUrlForCities(): string {
    const params = this.getQueryParams();
    let result = '';

    for (let index = 0; index < params!.selectedCities.length; index++) {
      const city = params!.selectedCities[index];
      result = result + '&filters[$or][' + index + '][cities][id][$eq]=' + city.id
    }

    return result;
  }



  // если параметров не задано то вовзращает true
  isQueryEmpty(): boolean {
    const params = this.getQueryParams();
    if (params!.categorys.length === 0
      && params!.selectedCities.length === 0
      && params!.maximalPrice === 0
      && params!.minimalPrice === 0
      && params!.text === '') {
      return true;
    } else {
      return false;
    }
  }

  isAnythingInFiltersAdded(): boolean {
    const params = this.getQueryParams();
    if (params!.maximalPrice > 0 ||
      params!.minimalPrice > 0 ||
      params!.categorys.length > 0 ||
      params!.selectedCities.length > 0 ||
      params!.text.length > 0 ||
      params!.text !== ''
    ) {
      return true;
    } else {
      return false;
    }
  }


  getCurrentPagination() {
    return this.paginationSource.value;
  }

  setDatasetValue(value: any) {
    this.responseDataSource.next(value);
  }


  setPaginationPageNumber(pageNumber: number) {
    localStorage.setItem('current_page', pageNumber.toString());

    const PAG: IPagination = {
      page: pageNumber,
      pageSize: 25,
      pageCount: null,
      total: null
    }

    this.paginationSource.next(PAG);
  }


  getCitys() {
    let locale = this.getLocal();

    return this.http.get(this.strapiUrl + 'cities?populate=*' + '&locale=' + locale).subscribe((res: any) => {
      if (res) {
        // // 
        this.citysSource.next(res.data);
      }
    });
  }

  getCountrys() {
    let locale = this.getLocal();
    return this.http.get(this.strapiUrl + 'countries?populate=*' + '&locale=' + locale).subscribe((res: any) => {
      if (res) {
        this.countrysSource.next(res.data);
      }
    });
  }

  getStrapiProposalsByIds(itemsId: number[]) {
    let locale = this.getLocal();
    var PROPOSALS_QUERY_FAVOURS = gql`
        query GetProposalsByIds {
          proposals(filters: {
            id: {in: [${itemsId}]}
          }) 
          {
            data {
              id
              attributes {
                name
                description
                createdAt
                price
                proposal_status {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                proposal_types {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                images {
                  data {
                    attributes {
                      formats
                    }
                  }
                }
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
            meta {
              pagination {
                pageSize
                page
                pageCount
                total
              }
            }
          }
        }
      `;

    return this.apollo.query({
      query: PROPOSALS_QUERY_FAVOURS
    })
  }


  getCatalogCategoryesGQL() {
    return this.apollo.query({
      query: CATEGORIES_QUERY
    }).pipe(
      map((res: any) => {
        this.proposalTypesSource.next(res.data.proposalTypes.data);
      }, (err: any) => {
      })
    ).subscribe((res: any) => {
      if (res) {
        return res;
      }
    })
  }


  getAmenitites() {
    return this.apollo.query({
      query: AmenitiesQuery
    }).pipe(
      map((res: any) => {
        this.amenitiesSource.next(res.data.amenities.data);
      }, (err: any) => {
      })
    ).subscribe((res: any) => {
      if (res) {
        return res;
      }
    })
  }


  cleanAllFilters(): void {
    const params = this.getQueryParams();
    params!.categorys = [];
    params!.selectedCountries = [];
    params!.selectedCities = [];
    params!.minimalPrice = 0;
    params!.maximalPrice = 0;
    params!.isAscending = false;
    params!.isDescending = false;
    params!.isRealBussinessEnabled = false;
    params!.text = '';
    if (params)
      this.setQueryParams(params);
    this.getAllDataWithGQL();
  }








}
