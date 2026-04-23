import { IImageResponse } from "./image";




    export interface IGenericCategory {
        data: IGenericData[];
    };


    export interface IGenericData {
        id: string;
        attributes: IGenericAttributes;
    }



    export interface IGenericAttributes {
        name:string,
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        description: Date;
        uuid: string
    }


