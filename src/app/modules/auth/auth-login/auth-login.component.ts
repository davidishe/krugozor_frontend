/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isEmailValidate } from "src/app/shared/validators/email.validator";
import { TranslateService } from "@ngx-translate/core";
import { IPenging } from "src/app/models/helpers/pending";
import { AuthService } from '../auth.service';
import { IUser } from '../auth-models/user';


// https://stackblitz.com/edit/angular-apple-signin?file=src%2Fapp%2Fapp.component.ts
// https://javascript.plainenglish.io/sign-in-with-apple-in-angular-web-app-630a9791e291
declare var AppleID;


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['../auth.component.scss'],
})

export class AuthLoginComponent implements OnInit {

  user: IUser;
  googleUser: any;

  loggedIn: boolean;
  form!: FormGroup;
  isAgency: boolean;
  returnUrl: string;
  ssoLoginSub: Subscription;
  errors: string[] = [];
  isPending: IPenging = {};

  language_initiated: boolean = false;
  authSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private translateService: TranslateService
  ) {

  }

  ngOnInit() {
    this.isAgencyToggleEnabled();
    this.initFormLogin();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/' ;
  }

  isAgencyToggleEnabled(): boolean {
    const is_agent = +localStorage.getItem('is_agent');
    if(is_agent) {
      this.isAgency = true;
      return true;
    }

    else {
      localStorage.setItem('is_agent', "0");
      this.isAgency = false;
      return false;
    }
  }

  setAgentToggle(event) {
    this.isAgency = event;
    console.log(this.isAgency);
    
  }


  initFormLogin() {
    this.form = new FormGroup({
      inputEmailLogin: new FormControl(null, [Validators.required, isEmailValidate()])
    });
  }

  onLogin() {
    if (this.form.invalid) {
      console.log(this.form.get('inputEmailLogin').value);
      return;
    } else {
      const email = this.form.get('inputEmailLogin').value;
      this.isPending.email = true;
        this.authSub = this.authService.registerWithEmail(email, this.isAgency).subscribe((res: any) => {
          if (res) {
          this.isPending.email = false;
            this.router.navigate(['auth/token', email]);
          }
        }, error => {
          console.log(error);
          this.errors = error.errors;
          console.log(this.errors);
        });


    }
  }

  signInFacebook() {    
  }


  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }


  onSuccessAuthorize() {
    this.router.navigateByUrl(this.returnUrl);
  }







}




