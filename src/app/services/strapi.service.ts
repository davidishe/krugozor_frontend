import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  backendUri = environment.baseUri;

  constructor(
      public http: HttpClient,
  ) { 
  }

  publishProposal(proposalId: number) {
    return this.http.post<any>(this.backendUri + 'strapi/proposals/proposal/publish/' + proposalId, null);
  }

  draftProposal(proposalId: number) {
    return this.http.post<any>(this.backendUri + 'strapi/proposals/proposal/draft/' + proposalId, null);
  }

  setProposalType(proposalId: number, proposalTypeId: number) {
    return this.http.post<any>(this.backendUri + "strapi/proposals/proposal/type/" + proposalId + "/" + proposalTypeId, null);
  }
}
