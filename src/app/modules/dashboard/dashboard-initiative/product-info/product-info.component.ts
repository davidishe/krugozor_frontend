import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { RequestsService } from '../../requests/requests.service';
import { ProposalFeatureService } from '../proposal-feature/proposal-feature.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { IEntity } from 'src/app/models/main/proposal';
import { IItem } from 'src/app/models/main/response';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  @Input() currentInitiative: IItem;
  @Input() isRequestSelected: boolean;
  isCopiyed: boolean = false;
  isRequestAdding: boolean = false;
  featureStatus$: Observable<boolean>;
  // salesmanProfile: IUser;
  proposalId: number;
  profile: any;


  rangeVar: string;
  selectedShare: number = 0;
  isOrderingAvailbale: boolean = false;
  isPending: boolean = false;
  isUpdateMode: boolean = false;



  constructor(
    private _clipboardService: ClipboardService,
    private router: Router,
    private proposalFeatureService: ProposalFeatureService,
    private requestsService: RequestsService,
    private authService: AuthService,
    private requestService: RequestsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.featureStatus$ = this.proposalFeatureService.featureStatus$;
    this.proposalId = +this.currentInitiative.id;

    if (+this.proposalId > 0) {
      this.getAllInvestors();
    }
  }



  getAllInvestors(): void {
    this.requestService.getRequestsByStrapiProposalId(this.proposalId).subscribe((res: any) => {
      if (res) {
        this.profile = res;
        this.isPending = false;
      }
    })
  }




}
