import { IUser } from "src/app/modules/auth/auth-models/user";

export interface IRequest {
    id?: number;
    name: string;
    pictureUrl: string;
    region: any;
    enrolledDate: Date;
    shareValue: number;
    investor: IUser;
    statusId: number;
    proposalId: number;
}

