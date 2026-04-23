import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPopoverData } from './popover';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  strapiUrl = environment.strapiUrl;

  private popoverStateSource = new BehaviorSubject<IPopoverData | null>(null);
  popoverState$ = this.popoverStateSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }


  setPopoverStatus(data: IPopoverData) {
    this.popoverStateSource.next(data);
  }

  getPopoverStatus() {
    return this.popoverStateSource.value;
  }


  setCurrentLanguage(langCode: string) {
    return this.http.post<any>(this.strapiUrl + 'language/set?culture=' + langCode, null);
  }

  closePopover() {
    const popoverData = this.getPopoverStatus();
    popoverData!.popoverType = null;
    popoverData!.status = false;
    popoverData!.isTotalBlack = false;
    popoverData!.blackWrapper = false;
    if(popoverData)
      this.setPopoverStatus(popoverData);
  }

}
