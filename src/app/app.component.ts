import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, delay, of } from 'rxjs';
import { PopoverService } from './modules/ui/popover/popover.service';
import { IPopoverData } from './modules/ui/popover/popover';
import { LoadingService } from './services/loading.service';
import { AuthService } from './modules/auth/auth.service';
import {
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { options } from './modules/messenger/helpers';
import { environment } from 'src/environments/environment';
import { MessengerService } from './modules/messenger/messenger.service';
import { ICommonChatStatus } from './modules/messenger/models/common-status';







@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('body', { static: true }) bodyElement: ElementRef;



  path: string;
  authSub: Subscription;
  sub: Subscription;
  isLoading$: Observable<boolean>;
  popoverState$: Observable<IPopoverData>;
  profileMenuState$: Observable<IPopoverData>;
  isBlocked: boolean = false;

  logs: string[] = [];
  polled = false;

  constructor(
    private loadingService: LoadingService,
    public popoverService: PopoverService,
    private cdr: ChangeDetectorRef,
    private messengerService: MessengerService,
    private authService: AuthService,
  ) {
  }




  async ngOnInit() {
    console.log('APP_VERSION_0.4');

    const popoverData: IPopoverData = {
      status: false,
      popoverType: null,
      blackWrapper: false,
      data: [],
      isTotalBlack: false
    }

    this.popoverService.setPopoverStatus(popoverData);
    this.loadingService.isLoading$ = this.isLoading$;
    this.popoverState$ = this.popoverService.popoverState$;
    this.profileMenuState$ = this.popoverService.popoverState$;
    this.getUserInfo();


  }

  unreadMessagesCount: number = 0;
  procData(data: ICommonChatStatus) {
    // console.log(data);
    this.unreadMessagesCount = data.unreadMessagesCount;
    this.messengerService.setCommonChatData(data);

  }


  getUserInfo(): void {
    this.authSub = this.authService.loadCurrentUser().subscribe((res: any) => {
      if (res) {
        this.authService.patchUserValue(res);
        localStorage.setItem('userId', res?.id?.toString());
        localStorage.setItem('strapiCompanyId', res?.strapiCompanyId?.toString());
        this.authService.checkIsProfileIsFullfiled();
      }
    })
  }




  ngAfterContentChecked(): void {

    this.sub = this.popoverState$?.subscribe((state) => {
      if (state?.status === true) {
        disableBodyScroll(this.bodyElement.nativeElement);
        this.isBlocked = true;
        return;

      }
      if (!state?.status === true) {
        enableBodyScroll(this.bodyElement.nativeElement);
        return;
      }
    });


    this.sub = this.profileMenuState$?.subscribe((state) => {
      if (state?.status === true) {
        disableBodyScroll(this.bodyElement.nativeElement);
        return;
      }
      if (!state?.status === true && this.isBlocked !== true) {
        enableBodyScroll(this.bodyElement.nativeElement);
        return;
      }

    });

    this.cdr.detectChanges();
  }


  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.sub?.unsubscribe();
  }




}

const firstRequest = of('firstRequest').pipe(delay(5000));
const secondRequest = of('secondRequest').pipe(delay(3000));

let index = 0;

export function getData() {

  if (index === 0) {
    index++;
    return firstRequest;
  }

  return secondRequest
}

