import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  authUri = environment.baseUri;

  private allSpecificAgentProposalSource = new BehaviorSubject<any>(null); 
  allSpecificAgentProposal$ = this.allSpecificAgentProposalSource.asObservable();

  constructor(
      public http: HttpClient,
  ) { }


  getRequestsForSpecificAgentPage() {
    return this.http.get<any>(this.authUri + 'profile/profile_with_requests_for_agent');
  }


  getProfileByStrapiProposalId(strapiProposalId: number) {
    return this.http.get<any>(this.authUri + 'profile/profile_with_requests_by_id/' + strapiProposalId);
  }


}
