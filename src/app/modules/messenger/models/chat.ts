import { IUser } from "../../auth/auth-models/user";
import { IMessage } from "./message";

export interface IChat {
    id: number;
    messages: IMessage[];
    recepientId: number;
    authorId: number;
    createdAt: string;
    authorUser: IUser;
    destinationUser: IUser;
    updatedAt: Date;
}