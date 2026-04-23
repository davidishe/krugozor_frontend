export interface ICommonChatStatus {
  prtintingUsersItems: ICommonChatStatusItem[];
  connectionItems: ICommonChatStatusItem[];
  unreadMessagesCount: number;
}


export interface ICommonChatStatusItem {
  userId: number;
}