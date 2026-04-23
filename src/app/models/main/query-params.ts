import { ICity } from "./city";
import { ICountry } from "./country";

export interface QueryParams {
  id: number;
  text: string;
  minimalPrice: number;
  maximalPrice: number;
  currentLangCode: string;
  isDescending: boolean;
  isAscending: boolean;
  categorys: ICategoryParam[];
  selectedCities: ICity[];
  selectedCountries: ICountry[];
  selectedProposalTypes: any[];
  selectedAmenities: any[];
  defaultCountryId: number;
  curentCategorysLevel: number;
  isPending: boolean;
  isRealBussinessEnabled: boolean;
  maxPlaceArea: number;
  minPlaceArea: number;
  maxBuildingYear: number;
  minBuildingYear: number;
}


export interface ICategoryParam {
  id: number;
  name?: string;
  attributes: IAttribtues;
}


export interface IAttribtues {
  name?: string;
  category: any;
  level: number;
  categories?: any;
}





