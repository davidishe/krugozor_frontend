import { IHttpConnectionOptions } from "@microsoft/signalr";

export const options: IHttpConnectionOptions = {
  accessTokenFactory: async () => {
    const token = localStorage.getItem('app_token');
    return  token;
  }
};
