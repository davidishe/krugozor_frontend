import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../auth/auth-models/user';
import { AuthService } from '../../auth/auth.service';
import { PopoverService } from '../../ui/popover/popover.service';
import { IPopoverData } from '../../ui/popover/popover';
import { PopoverTypes } from '../../ui/popover/popover-type';

@Component({
  selector: 'app-tw-profile-badge',
  templateUrl: './tw-profile-badge.component.html',
  styleUrls: ['./tw-profile-badge.component.scss']
})
export class TwProfileBadgeComponent implements OnInit {

  popoverStatus$: Observable<IPopoverData>;
  currentUser$: Observable<IUser>;

  constructor(
    private popoverService: PopoverService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.popoverStatus$ = this.popoverService.popoverState$;
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleProfileMenuStatus() {
    const params = this.popoverService.getPopoverStatus();
    console.log(222222);
    params.status = !params.status;
    params.popoverType = PopoverTypes.menu;
    this.popoverService.setPopoverStatus(params);
  }

  close(): void {
    console.log(1111111111);
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData.popoverType = PopoverTypes.menu;
    popoverData.status = false;
    this.popoverService.setPopoverStatus(popoverData);
  }



}
