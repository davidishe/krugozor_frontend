import { Component, HostListener, OnInit } from '@angular/core';
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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  posts: any[] = [];
  currentUser$: Observable<IUser>;
  profileMenuStatus$: Observable<IPopoverData>;
  isLoaded: boolean = false;
  popoverState$: Observable<IPopoverData>;
  curentMainCategoryParam: ICategoryParam;
  navbarItems$: Observable<QueryParams[]>;

  constructor(
    private router: Router,
    public popoverService: PopoverService,
    private proposalService: ProposalsService,
    public authService: AuthService
  ) { }



  ngOnInit() {
    this.profileMenuStatus$ = this.popoverService.popoverState$;
    this.currentUser$ = this.authService.currentUser$;
    this.popoverState$ = this.popoverService.popoverState$;
    this.navbarItems$ = this.proposalService.proposalTypes$;
    
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
    // window.location.href = '';
  }


  close(): void {
    console.log(111222333);
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData.popoverType = PopoverTypes.menu;
    popoverData.status = false;
    this.popoverService.setPopoverStatus(popoverData);
  }

  goToMessenger() {
    const url = 'messenger';
    window.open(url, "_blank");
    close();
  }


  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    // const params = this.proposalService.getQueryParams();
    // this.curentMainCategoryParam = params.categorys[0];
    // localStorage.setItem('curentMainCategoryParam', JSON.stringify(this.curentMainCategoryParam));
  }




}
