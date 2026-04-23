import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRequest, IRequestDto } from './requests.models';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  strapiUrl = environment.strapiUrl;
  authUri = environment.baseUri;


  private requestsSource = new BehaviorSubject<IRequest[]>(null);
  requests$ = this.requestsSource.asObservable();

  private requestsDtoSource = new BehaviorSubject<IRequestDto[]>(null);
  requestsDto$ = this.requestsDtoSource.asObservable();



  constructor(
      public http: HttpClient,
  ) { 
  }

  getLocal(): string {
    const curentLang = localStorage.getItem('default_lang');

    if (curentLang.includes('ru'))
      return 'ru';

    if (curentLang.includes('en'))
        return 'en';
    
    if (curentLang.includes('geo'))
      return 'ka';
  }


  getRequestsByStrapiProposalId(strapiProposalId: number) {
    return this.http.get<any>(this.authUri + 'profile/profile_with_requests?strapiProposalId=' + strapiProposalId);
  }


  addRequestToProfile(strapiProposalNumber: number, shareValue: number) {
    return this.http.post<any>(this.authUri + 'profile/requests/add?strapiProposalNumber=' + strapiProposalNumber + '&shareValue=' + shareValue, null);
  }


  changeRequestAmmount(requestId: number, shareValue: number) {
    return this.http.post<any>(this.authUri + 'profile/requests/change?requestId=' + requestId + '&shareValue=' + shareValue, null);
  }


  goToDeal(strapiProposalId: number) {
    return this.http.post<any>(this.authUri + 'profile/change/go_to_deal/' + strapiProposalId, null);
  }

  goToRollback(strapiProposalId: number) {
    return this.http.post<any>(this.authUri + 'profile/change/rollback_to_pledge/' + strapiProposalId, null);
  }

  goToFinish(strapiProposalId: number) {
    return this.http.post<any>(this.authUri + 'profile/change/go_to_finish/' + strapiProposalId, null);
  }

  getProposalProfileLimits(strapiProposalId: number) {
    return this.http.get<any>(this.authUri + 'requests/limits/' + strapiProposalId);
  }


  getRequstesForUser() {
    return this.http.get<any>(this.authUri + 'requests/user');
  }


  getProposalsForRequestsFromStrapi(requestsDto: any[]) {
    let filtersUri: string = '';
    const ARRAY_FOR_QUERY = requestsDto.map(s => ({id: s.strapiProposalNumber})); // no error
    ARRAY_FOR_QUERY.forEach(id => {
      filtersUri = filtersUri + '&filters[id][$eq]=' + id.id
    });

    return this.http.get<any>(this.strapiUrl + 'proposals?populate=*' + filtersUri).pipe(
      map((res: any) => {
        if (res) {
            this.requestsSource.next(res.data);
          
        }
      })
    ).subscribe();
  }



}
