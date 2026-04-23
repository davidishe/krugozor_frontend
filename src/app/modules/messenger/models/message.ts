import { IUser } from "../../auth/auth-models/user";
import { IFileHandle } from "./file-hande";
import { IMessageImage } from "./message-image";

export interface IMessage {
  id?: number;
  text: string,
  guId: string;
  userName: string;
  authorId: number;
  destinationUser: IUser;
  chatId: number;
  createdAt: any;
  isReaded: boolean;
  images: IFileHandle[];
  withImages?: boolean;
}