export interface IAlertSettings {
  isVisible?: boolean;
  color: IAlertType;
  message: string;
  secondMessage?: string;
  routerPath?: string;
  routerText?: string;
  icon: string;
  timeout: number;
}



export enum IAlertType {
  green = 'green',
  info = 'info',
  red = 'red',
}


