/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
import { restrictNumbers } from 'src/app/shared/validators/restrict-numbers.validator';
import { restrictSpecCharacters } from 'src/app/shared/validators/restrict-spec-characters.validator';
import { IUser } from '../../auth/auth-models/user';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss'],
})

export class DashboardProfileComponent  implements OnInit, AfterViewInit, OnDestroy{
  form!: FormGroup;
  isPending: boolean = false;
  currentUser$: Observable<IUser>;

  user_name_already_exists_error: boolean = false;
  disabled: boolean = false;
  sub: Subscription;
  
  constructor(
    // public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private translate: TranslateService,

  ) {
  }


  ngOnInit() {
  }


  useLanguage(language: string) {
    localStorage.setItem('default_lang', language);
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.updateUserProfile();
  }


  createForm(currentUser: IUser) {
    this.form = new FormGroup({
      firstName: new FormControl(currentUser.firstName, 
        [Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(200), 
          restrictSpecCharacters(), 
          restrictNumbers()]),
      secondName: new FormControl(currentUser.secondName, 
        [Validators.minLength(2), 
          Validators.maxLength(200), 
          restrictSpecCharacters(), 
          restrictNumbers()]),
      email: new FormControl(currentUser.email)
    });

    this.cdr.detectChanges();

  }

  updateUserProfile() {

  }



  reload(translation: any): void {
    this.router.navigate(['/', translation[1]]);
  }

  logout(): void {
    // this.authService.logout();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdr.detectChanges();
  }

    ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


}
