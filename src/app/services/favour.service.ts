import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IFavour } from '../modules/auth/auth-models/user';

@Injectable({
  providedIn: 'root'
})
export class FavourService {

  backendUri = environment.baseUri;
  private userFavoursSource = new BehaviorSubject<any[]>([]);
  userFavours$ = this.userFavoursSource.asObservable();

  constructor(
    public http: HttpClient
  ) { }


  setFavour(favour: any) {
    let favours = this.userFavoursSource.value;
    favours.push(favour);
    this.userFavoursSource.next(favours);
  }

  removeFavour(favour: any) {
    let favours = this.userFavoursSource.value;
    favours = favours.filter(z => +z.proposalProfile?.strapiProposalId !== +favour.proposalProfile?.strapiProposalId);
    this.userFavoursSource.next(favours);
  }

  postFavourProposal(proposalId: number) {
    return this.http.post<any>(this.backendUri + 'profile/favour/add/' + proposalId, null);
  }

  getAllFavoursForUser() {
    return this.http.get<any>(this.backendUri + 'profile/favour/check').pipe(
      map((res: any) => {
        this.userFavoursSource.next(res);
      }, () => {
      })
    ).subscribe((res: any) => {
      if (res) {
        return res;
      }
    });
  }

  deleteFavourProposal(proposalId: number) {
    return this.http.post<any>(this.backendUri + 'profile/favour/remove/' + proposalId, null);
  } 

}
