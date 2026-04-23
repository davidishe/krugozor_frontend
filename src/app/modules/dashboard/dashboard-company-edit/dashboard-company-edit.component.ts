import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStrapiAbstractFieldDto, IStrapiDto } from 'src/app/models/main/dtos';
import { CompanyService } from 'src/app/services/company.service';
import { TwAlertService } from '../../tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from '../../tw-ui-kit-local/tw-alert/tw-alert';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard-company-edit',
  templateUrl: './dashboard-company-edit.component.html',
  styleUrls: ['./dashboard-company-edit.component.css']
})
export class DashboardCompanyEditComponent implements OnInit {

  form!: FormGroup;
  sub: Subscription;
  isPending: boolean = false;
  isLoading: boolean = true;
  currentCompany: any;
  companyId: number;
  citiesToUpdate: IStrapiAbstractFieldDto[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private authService: AuthService,
    private alertService: TwAlertService

  ) { }

  ngOnInit() {
    this.createForm();
    this.companyId = +this.activatedRoute.snapshot.params['companyId'];
    
    if (this.companyId > 0) {
        this.sub = this.companyService.getCompanyById(this.companyId)?.subscribe((res: any) => {
        if (res) {
          this.currentCompany = res;
          this.patchFromWithValues();
          this.isLoading = false;
        }
      });
    }
  }


  updateCompanyInfo() {
    this.isPending = true;

    const strapiDto: IStrapiDto = {
      strapiProposalId: this.companyId,
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      website: this.form.get('website').value,
      address: this.form.get('address').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      instagramCompanyName: this.form.get('instagramCompanyName').value,
      telegramCompanyName: this.form.get('telegramCompanyName').value,
      facebookCompanyName: this.form.get('facebookCompanyName').value,
      cities: this.citiesToUpdate
    }

    this.companyService.saveCompany(strapiDto).subscribe((res: any) => {
      if(res) {
        const user = this.authService.getCurrentUserValue();
        if(user.isAgency)
          this.standartNotification();
        else
          this.firstAgentNotification();

        user.isAgency = true;
        this.authService.patchUserValue(user);
        this.isPending = false;
      }
    })
  }


  standartNotification() {
    let message = "Данные обновлены";
    let alertSettings: IAlertSettings = {
          isVisible: true,
          message: message,
          icon: "thumb_up_white",
          timeout: 4500,
          color: IAlertType.green
    };
    this.alertService.apearAlert(alertSettings);
  }

  firstAgentNotification() {
    let message = "Данные обновлены";
    let secondMessage = "Теперь ты можешь разместить свой объект на платформе и найти покупателей!"
    let alertSettings: IAlertSettings = {
          isVisible: true,
          message: message,
          secondMessage: secondMessage,
          icon: "thumb_up_white",
          timeout: 7500,
          routerPath: "/dashboard/proposals",
          routerText: "Перейти",
          color: IAlertType.green
    };
    this.alertService.apearAlert(alertSettings);
  }


  patchFromWithValues() {
    this.form.get('name')!.patchValue(this.currentCompany.data.attributes.name);
    this.form.get('description')!.patchValue(this.currentCompany.data.attributes.description);
    this.form.get('website')!.patchValue(this.currentCompany.data.attributes.website);
    this.form.get('email')!.patchValue(this.currentCompany.data.attributes.email);
    this.form.get('address')!.patchValue(this.currentCompany.data.attributes.address);
    this.form.get('phone')!.patchValue(this.currentCompany.data.attributes.phone);
    this.form.get('instagramCompanyName')!.patchValue(this.currentCompany.data.attributes.instagramCompanyName);
    this.form.get('telegramCompanyName')!.patchValue(this.currentCompany.data.attributes.telegramCompanyName);
    this.form.get('facebookCompanyName')!.patchValue(this.currentCompany.data.attributes.facebookCompanyName);
  }


  createForm() {
    this.form = new FormGroup(
        {
          name: new FormControl(null, [Validators.required]),
          description: new FormControl(null, [Validators.required]),
          website: new FormControl(null, []),
          email: new FormControl(null, [Validators.required]),
          address: new FormControl(null, [Validators.required]),
          phone: new FormControl(null, [Validators.required]),
          instagramCompanyName: new FormControl(null, []),
          telegramCompanyName: new FormControl(null, []),
          facebookCompanyName: new FormControl(null, [])
        },
    );
  }

  setSelectedCities(event) {
    console.log(event);
    this.citiesToUpdate = event;
  }

  isCompanyProfileCompleted(): boolean {

    if(this.form.status === 'INVALID')
      return true;

    if(this.citiesToUpdate?.length === 0)
      return true;

    return false;
  }

}
