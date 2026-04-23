import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../auth/auth-models/user';
import { AuthService } from '../../auth/auth.service';
import { PopoverService } from '../../ui/popover/popover.service';
import { IPopoverData } from '../../ui/popover/popover';

@Component({
  selector: 'app-tw-profile-badge-login',
  templateUrl: './tw-profile-badge-login.component.html',
  styleUrls: ['./tw-profile-badge-login.component.scss']
})
export class TwProfileBadgeLoginComponent implements OnInit {

  popoverStatus$: Observable<IPopoverData>;
  currentUser$: Observable<IUser>;
  isLoaded: boolean = false;

  constructor(
    private popoverService: PopoverService,
  ) { }

  ngOnInit() {
    
    this.popoverStatus$ = this.popoverService.popoverState$;
  }

}
