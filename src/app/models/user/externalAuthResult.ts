import { IUser } from '../rating-dto';


export interface ExternalAuthResult {
  errors: string[];
  token: string;
  success: boolean;
  user: IUser;
}
