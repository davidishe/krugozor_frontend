import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalFeatureService {

  private featureStatusSource = new BehaviorSubject<boolean>(null);
  featureStatus$ = this.featureStatusSource.asObservable();

  constructor() { }

  setStatus(status: boolean) {
    this.featureStatusSource.next(status);
  }

}
