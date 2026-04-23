import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { SettingsService } from '../settings.service';
import { CompanyService } from 'src/app/services/company.service';
import { ICompanyAttributes } from 'src/app/models/main/company';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {

  @Input() currentUser: IUser;
  form!: FormGroup;
  isPending: boolean = false;
  companyAttributes: ICompanyAttributes;
  imageUri = environment.imageUri;


  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private companyService: CompanyService
  ) { }

  

  ngOnInit() {
    

    this.authService.currentUser$.subscribe((res: IUser) => {
      if (res) {
        this.currentUser = res;
        
        this.getStrapiCompanyProfile(this.currentUser.strapiCompanyId)
      }
    })
  }

  getStrapiCompanyProfile(companyId: number) {
    this.companyService.getCompanyById(companyId).subscribe((res: any) => {
      if(res) {
        
        this.companyAttributes = res.data.attributes;
      }
    })
  }



  updateData() {
    if(this.isPending)
      return;

    this.isPending = true;

    console.log(this.form.value);
    this.settingsService.updateProfileInfo(this.form.value).subscribe((res: IUser) => {
      if (res) {
        setTimeout(() => {
          
          this.isPending = false;
        }, 1000);
        
      }
    })
  }









}
