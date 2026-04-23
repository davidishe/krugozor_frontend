import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProposalsService } from 'src/app/services/proposals.service';
import { IUser } from '../auth/auth-models/user';
import { AuthService } from '../auth/auth.service';
import { IPopoverData } from '../ui/popover/popover';
import { PopoverService } from '../ui/popover/popover.service';
import { ICategoryParam, QueryParams } from 'src/app/models/main/query-params';
import { PopoverTypes } from '../ui/popover/popover-type';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {

  posts: any[] = [];
  currentUser$: Observable<IUser>;
  profileMenuStatus$: Observable<IPopoverData>;
  isLoaded: boolean = false;
  popoverState$: Observable<IPopoverData>;
  curentMainCategoryParam: ICategoryParam;
  navbarItems$: Observable<QueryParams[]>;


  @Input() unreadMessagesCount: number;

  constructor(
    private router: Router,
    public popoverService: PopoverService,
    private proposalService: ProposalsService,
    public authService: AuthService
  ) { }



  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;
    
    setTimeout(() => {
      this.isLoaded = true;

    }, 1000);
  }

  goToMain(): void {
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData.popoverType = PopoverTypes.menu;
    popoverData.status = false;
    this.popoverService.setPopoverStatus(popoverData);
    this.router.navigate(['/']);
  }



  goToMessenger() {
    const url = 'messenger';
    window.open(url);
    window.location.reload();
  }


  ngOnDestroy(): void {
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
  }


}
