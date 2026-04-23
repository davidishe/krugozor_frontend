/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPhoto } from 'src/app/models/user/photo';
import { environment } from 'src/environments/environment';
import { IUser, IUserProfileDto } from './auth-models/user';
import { JwtService } from './jwt.service';
import { TwAlertService } from '../tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from '../tw-ui-kit-local/tw-alert/tw-alert';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUri = environment.baseUri;
  progress: number;
  sub: Subscription;


  @Output() public OnUploadFinished = new EventEmitter();

  public result?: IPhoto;


  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();
  userId: number;

  constructor(
    public http: HttpClient,
    private router: Router,
    private jwtService: JwtService,
    private alertService: TwAlertService
  ) {}


  registerWithEmail(email: string, isAgency: boolean) {  
    const current_language: string = localStorage.getItem('default_lang');
    return this.http.post<any>(this.authUri + 'account/register_email?email=' + email + '&isAgency=' + isAgency, null).pipe(
      map((res: any) => {
        return res;
      }, (err: any) => {
      })
    );
  }


  getAuthToken(token: string, email: string) {
    return this.http.post<any>(this.authUri + 'account/login_with_email_code?code=' + token + '&email=' + email, null).pipe(
      map((res: IUser) => {
        if (res && res.token) {
          if (token) {
          const DECODED_TOKEN = this.jwtService.DecodeToken(res.token);
          console.log(DECODED_TOKEN);
          localStorage.setItem('app_token', res.token);

            this.sub = this.loadCurrentUser().subscribe((user: IUser) => {
            if (user) {
                this.setCurrentUserValue(user);
                localStorage.setItem('userId', user?.id?.toString());
                localStorage.setItem('strapiCompanyId', user?.strapiCompanyId?.toString());


                setTimeout(() => {
                  this.router.navigate(['dashboard']);
                  this.checkIsProfileIsFullfiled();
                }, 1000);
              
              
              }
            });
          }

        }
      })
    );
  }


  patchUserValue(user: IUser): void {
    this.currentUserSource.next(null);
    this.currentUserSource.next(user);
  }


  loadCurrentUser() {
    return this.http.get<any>(this.authUri + 'account/current');
  }



  getUserById(userId: number) {
    return this.http.get<any>(this.authUri + 'account/get_user_by_id?userId=' + userId);
  }

  checkIsProfileIsFullfiled() {
    const user = this.getCurrentUserValue();
    
    let dataToFill: string[] = [];

    if(user.firstName === null)
      dataToFill.push("имя");

    if(user.pictureUrl === null)
      dataToFill.push("аватарка");

    if(user.phoneNumber === null 
      && user.facebookUserName === null 
      && user.telegramUserName === null 
      && user.instagramUserName === null)
        dataToFill.push("контакты");
    
    let dataToFillString: string = "";
    for (let index = 0; index < dataToFill.length; index++) {
      if(index < (dataToFill.length - 1))
        dataToFillString += dataToFill[index] + `, `;
      else
        dataToFillString += dataToFill[index];
      }

    let message: string = 
    `У вас не заполнены данные: ${dataToFillString}.`;
    let secondMessage: string = 
    `Пожалуйста, заполните данные, они необходимы для команды поддержки и работы на платформе.`
    if(dataToFill.length > 0) {
      let routerLink = "dashboard/settings";
      let settings: IAlertSettings = {
        isVisible: true,
        message: message,
        secondMessage: secondMessage,
        icon: "thumb_up_white",
        timeout: 6500,
        routerPath: routerLink,
        routerText: "Перейти",
        color: IAlertType.info
      }
      this.alertService.apearAlert(settings);
    }
  }


  updateUserProfile(user: IUser) {
    return this.http.post<any>(this.authUri + 'user', user);
  }

  updateContacts(profileInfo: IUserProfileDto) {
    return this.http.put<any>(this.authUri + 'account/update/profile_contacts', profileInfo);
  }



  get token(): string {
    return localStorage.getItem('app_token');
  }


  isAuthenticated(): boolean {
    const TOKEN = localStorage.getItem('app_token');
    if(!TOKEN)
      return false;

    const DECODED_TOKEN: any = this.jwtService.DecodeToken(TOKEN);
    const CURRENT_TIME = Date.now();
    const RESULT = (DECODED_TOKEN.exp * 1000) > CURRENT_TIME;
    return RESULT;
  }

  isNameExists(): boolean {
    return !!this.currentUserSource.value?.firstName;
  }


  logout() {
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_token_exp');
    this.currentUserSource.next(null);
    this.router.navigate(['auth/login/']);
  }


  setCurrentUserValue(user: IUser) {
    this.currentUserSource.next(user);
  }


  getCurrentUserValue() {
    return this.currentUserSource.value;
  }


  logedIn() {
    const token = localStorage.getItem('app_token');
    if(token?.length > 0)
      return true;
    else
      return false;
    // return localStorage.getItem('app_token');
  }




  openSnackBar(message: string) {
  }


}
