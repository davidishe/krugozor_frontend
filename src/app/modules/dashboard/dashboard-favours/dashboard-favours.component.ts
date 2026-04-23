import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IFavour } from '../../auth/auth-models/user';
import { FavourService } from 'src/app/services/favour.service';
import { ProposalsService } from 'src/app/services/proposals.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-favours',
  templateUrl: './dashboard-favours.component.html',
  styleUrls: ['./dashboard-favours.component.css']
})
export class DashboardFavoursComponent implements OnInit, OnDestroy {

  userFavours$: Observable<IFavour[]>;
  favours: any;
  imageUri = environment.imageUri;
  array: number[] = [];
  isLoading: boolean = true;
  sub: Subscription;

  constructor(
    private favourService: FavourService,
    private proposalService: ProposalsService
  ) { }


  ngOnInit() {
    this.userFavours$ = this.favourService.userFavours$;
    this.sub = this.userFavours$.subscribe((res: IFavour[]) => {

      if (res) {

        
        res.forEach(num => {
          this.array.push(num.proposalProfile.strapiProposalId);
        });

        // если избранных нет, то присваиваем 0 и прекращаем процедуру
        if(this.array.length === 0) {
          this.favours = [];
          this.isLoading = false;
          return;
        }
        
        this.getFavoursFromStrapi(this.array);
      }
    })
  }

  getFavoursFromStrapi(array: number[]) {
    this.proposalService.getStrapiProposalsByIds(array).subscribe((res: any) => {
      if (res) {
        this.favours = res;
        setTimeout(() => {
          this.isLoading = false;
        }, 1400);
      }
    })
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
