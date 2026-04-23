import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { TwAlertService } from '../../tw-ui-kit-local/tw-alert/tw-alert.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-company-site',
  templateUrl: './dashboard-company-site.component.html',
  styleUrls: ['./dashboard-company-site.component.css']
})
export class DashboardCompanySiteComponent implements OnInit {

  sub: Subscription;
  isPending: boolean = false;
  isLoading: boolean = true;
  currentCompany: any;
  companyId: number;
  imageUri = environment.imageUri;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private alertService: TwAlertService

  ) { }

  ngOnInit() {
    this.companyId = +this.activatedRoute.snapshot.params['companyId'];
    
    if (this.companyId > 0) {
        this.sub = this.companyService.getCompanyById(this.companyId)?.subscribe((res: any) => {
        if (res) {
          this.currentCompany = res;
          this.isLoading = false;
          console.log(this.currentCompany);
        }
      });
    }
  }



}
