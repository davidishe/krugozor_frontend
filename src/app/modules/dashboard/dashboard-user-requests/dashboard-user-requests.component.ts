import { ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProposalsService } from 'src/app/services/proposals.service';
import { IRequest } from '../requests/requests.models';
import { RequestsService } from '../requests/requests.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-user-requests',
  templateUrl: './dashboard-user-requests.component.html',
  styleUrls: ['./dashboard-user-requests.component.css']
})
export class DashboardUserRequestsComponent implements OnInit {

  // orders: IRequest[] = [];
  sub: Subscription;
  allSpecificUserProposals: any;
  isLoading: boolean = true;
  imageUri = environment.imageUri;
  requests: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private requestService: RequestsService,
    private proposalService: ProposalsService
  ) { }

  ngOnInit() {

    this.isLoading = true;
    let array: number[] = [];
    this.sub = this.requestService.getRequstesForUser().subscribe((res: any) => {
      if (res) {     
        this.requests = res;
        console.log(this.requests);
        
        res.forEach(num => {
          array.push(num.strapiProposalNumber);
        });

        if (this.requests.length === 0) {
          this.allSpecificUserProposals = null;
          this.isLoading = false;
          return;
        }
        
        this.getProposalsByIdsFromStrapi(array);
      }
    });
    
  }

  getProposalsByIdsFromStrapi(array: number[]) {
    this.proposalService.getStrapiProposalsByIds(array).subscribe((res: any) => {
      if (res) {
        
        setTimeout(() => {
          this.allSpecificUserProposals = res;
          this.isLoading = false;
        }, 1400);
      }
    })
  }




  ngAfterViewChecked(): void {
  }


  getRequest() {
    return this.requests[0];
  }


  ngOnDestroy(): void {
    this.sub!.unsubscribe();
    this.cdr.detectChanges();
  }

}
