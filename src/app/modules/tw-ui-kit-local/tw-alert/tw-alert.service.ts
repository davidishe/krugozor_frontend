import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlertSettings, IAlertType } from './tw-alert';

@Injectable({
  providedIn: 'root'
})
export class TwAlertService {


    private alertSettingsSource = new BehaviorSubject<IAlertSettings>(null);
    alertSettings$ = this.alertSettingsSource.asObservable();

    apearAlert(alertSettings: IAlertSettings) {      
    this.alertSettingsSource.next(alertSettings);
      setTimeout(() => {
        alertSettings.isVisible = false;
        alertSettings.routerPath = null;
        alertSettings.routerText = null;
        this.alertSettingsSource.next(alertSettings);
      }, alertSettings.timeout);
    }


    disApearAlert() {
      const alertSettings: IAlertSettings = {
        isVisible: false,
        color: IAlertType.info,
        message: null,
        icon: "tw_info_white",
        timeout: 4500
      }
      this.alertSettingsSource.next(alertSettings);
    }


    constructor() { }

}
