import { ILocalizations } from "./localizations";
import { IEntity } from "./proposal";

export interface ICompanyAttributes {
  name: string;
  mail: string;
  website: string;
  address: string;
  facebookCompanyName: string;
  instagramCompanyName: string;
  telegramCompanyName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  phone: string;
  proposals: IEntity[];
  picture: any;
  cities: any[];
  localizations: ILocalizations;
  isTechnical: boolean;
}




