import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStrapiDto } from 'src/app/models/main/dtos';
import { ProposalsService } from 'src/app/services/proposals.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyProposalsService {


  strapiUrl = environment.strapiUrl;
  backendUri = environment.baseUri;

  private myProposalsSource = new BehaviorSubject<any>(null); 
  myProposals$ = this.myProposalsSource.asObservable();

  constructor(
    public http: HttpClient,
    private proposalService: ProposalsService
  ) { }


  getMyProposals(id: number) {
    let locale = this.proposalService.getLocal();
    return this.http.get<any>(this.strapiUrl + 'proposals?filters[company][id][$eq]=' + id + '&populate=deep,2' + '&locale=' + locale).pipe(
      map((res: any) => {
        // this.myProposalsSource.next(null);
        this.myProposalsSource.next(res);
        // 
        
      }, (err: any) => {
      })
    ).subscribe((res: any) => {
      if (res) {
        return res;
      }
    });
  }



  createOrUpdateItemWithStrapi(strapiDto: IStrapiDto) {
    let locale = this.proposalService.getLocal();
    return this.http.put<any>(this.backendUri + 'strapi/update/proposal', strapiDto);
  }




}
