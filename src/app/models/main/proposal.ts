import { IAddress } from "../user/address";
import { IImageResponse } from "./image";
import { IPagination } from "./pagination";





export interface IStrapiProposalAttributes {
    name: string;
    proposalType: string;
    region: any;
    city: string;
    countryIconPath: string;
    createdAt: Date;
    address?: IAddress;
    imageProfile: string;
    updatedAt?: Date;
    publishedAt?: Date;
    price?: number;
    description?: string;
    authorId?: number;
    cities?: any[];
}






export interface IMetaData {
    pagination: IPagination;
}


export interface IEntity {
    data: IStrapiData;
}


export interface IStrapiData {
    id: number;
    attributes: IStrapiProposalAttributes;
}


