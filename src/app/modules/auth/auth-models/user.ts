/* eslint-disable @typescript-eslint/naming-convention */
export interface IUser {
  id?: number;
  password_expired_at?: number;
  updated_at?: number;
  deleted?: number;
  firstName?: string;
  secondName?: string;
  username?: string;
  email?: string;
  locale?: string;
  token?: string;
  currentLanguage?: string;
  pictureUrl?: string;
  userDescription?: string;
  telegramUserName?: string;
  instagramUserName?: string;
  facebookUserName?: string;
  strapiCompanyId?: number;
  pnoneNumber?: string;
  phoneNumber?: number;
  isAgency?: boolean;
  wasOnline?: boolean;
}

export interface IFavour {
  strapiProposalId: number;
  proposalProfile: any;
  createdAt: any;
}



export interface IUserProfileDto {
  firstName?: string;
  secondName?: string;
  userDescription?: string;
}

