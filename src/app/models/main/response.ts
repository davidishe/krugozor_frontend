import { IMetaData, IStrapiData } from "./proposal";

export interface IResponseData {
    id?: number;
    data: IStrapiData[];
    meta?: IMetaData;
}

export interface IItem {
    id?: number;
    name: string;
    rating: bigint;
    description: string;
    createdAt: string;
    updatedAtd: string;
    youTubeLink?: string;
    tgNicknameLink?: string;
    imageProfile?: string;
    address?: string;
    bornedYear: number;
}
