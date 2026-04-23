import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUser } from '../../auth/auth-models/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  sub: Subscription;
  userProfile: IUser;
  currentUser$: Observable<IUser>;
  profileId: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;
    console.log(this.profileId);


    // this.getUserInfo()

  }

  
  // getUserInfo(): void {
  //   this.profileId = this.route.snapshot.params.id;

  //   this.sub = this.authService.getUserProfileByUserId(this.profileId).subscribe((res: any) => {
  //     if (res) {
  //       this.userProfile = res;
  //       console.log(this.userProfile);
  //     }
  //   })
  // }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  sendTelegramm(url: string): void {
      window.open('https://t.me/' + url, '_blank');
  }

}
