import { fromEvent, merge, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStatus } from '../models/helpers/status';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  private appIsOnlineSource = new BehaviorSubject<boolean>(null);
  appIsOnline$ = this.appIsOnlineSource.asObservable();

  constructor() {
    this.initConnectivityMonitoring();
  }

  setStatus(status: boolean): void {
    // console.log('status is: ' + status);
    this.appIsOnlineSource.next(status);
  }


  // getStatus(): Observable<IStatus> {
  //   return this.appIsOnline$;
  // }


  private initConnectivityMonitoring() {

    if (!window || !navigator || !('onLine' in navigator)) return;

    this.appIsOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine))

  }

}
