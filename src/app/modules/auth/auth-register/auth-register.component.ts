import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IPenging } from 'src/app/models/helpers/pending';
import { IUser } from '../auth-models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class AuthRegisterComponent implements OnInit {

errors: string[];
  isPending: IPenging = {};
  user: IUser;
  form!: FormGroup;
  isActive: boolean;
  returnUrl: string;
  authSub: Subscription;
  language_initiated: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    public authService: AuthService,
    ) {
  }



  ngOnInit(): void {
    this.initLanguage();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/' ;
    this.createRegisterForm();
    this.isActive = true;
  }

  createRegisterForm() {
    this.form = new FormGroup({
    inputLogin: new FormControl(null,
      [Validators.required])
    });
  }

  submitRegister() {
    if (this.form.invalid) {
      console.log(this.form.get('inputLogin').errors);
      return;
    } else {

      const email = this.form.get('inputLogin').value;
      this.isPending.email = true;
      // this.authService.registerWithEmail(email).subscribe((res: any) => {
      //   if (res.status === 200) {
      //   this.isPending.email = false;
      //     this.router.navigate(['auth/validate', email]);
      //   }
      // }, error => {
      //   console.log(error);
      //   this.errors = error.errors;
      //   console.log(this.errors);
      // });

    }
  }

  async signInFacebook() {
    
  }


    initLanguage(): void {
    const default_lang: string = this.translateService.defaultLang;
    
    if (default_lang) {
      this.language_initiated = true;
    }

    if (!default_lang) {
      this.translateService.setDefaultLang('en');
      this.language_initiated = true;
    
    }

  }

  changePasswordType() {
    this.isActive = !this.isActive;
  }

ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

}
