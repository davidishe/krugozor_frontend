import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getCurrentTTL(): number {
    const current_date = Math.round((new Date()).getTime() / 1000);
    return current_date;
  }

}
