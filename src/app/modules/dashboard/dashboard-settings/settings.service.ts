/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPhoto } from 'src/app/models/user/photo';
import { environment } from 'src/environments/environment';
import { IUser, IUserProfileDto } from '../../auth/auth-models/user';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '../../auth/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  authUri = environment.baseUri;

  constructor(
    public http: HttpClient,
    private router: Router
  ) {}


  updateProfileInfo(profileInfo: IUserProfileDto) {
    return this.http.put<any>(this.authUri + 'account/update/profile_info', profileInfo);
  }


  openSnackBar(message: string) {
  }


}
