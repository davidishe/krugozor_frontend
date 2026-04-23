import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProposalsService } from 'src/app/services/proposals.service';
import { AuthService } from '../../auth/auth.service';
import { IRequest } from '../requests/requests.models';
import { RequestsService } from '../requests/requests.service';
import { TwAlertService } from '../../tw-ui-kit-local/tw-alert/tw-alert.service';
import { ClipboardService } from 'ngx-clipboard';
import { environment } from 'src/environments/environment';
import { IEntity } from 'src/app/models/main/proposal';
import { IFavour, IUser } from '../../auth/auth-models/user';
import { FavourService } from 'src/app/services/favour.service';
import { PopoverService } from '../../ui/popover/popover.service';
import { IAlertSettings, IAlertType } from '../../tw-ui-kit-local/tw-alert/tw-alert';
import { PopoverTypes } from '../../ui/popover/popover-type';



@Component({
  selector: 'app-dashboard-initiative',
  templateUrl: './dashboard-initiative.component.html',
  styleUrls: ['./dashboard-initiative.component.scss'],
})

export class DashboardInitiativeComponent implements OnInit, OnDestroy {
  tripId: number;
  currentInitiative: IEntity;
  show: boolean[] = [];
  sub: Subscription;
  editFavourSub: Subscription;
  deleteSub: Subscription;
  subGetById: Subscription;
  requests$: Observable<IRequest[]>;
  domainUrl = environment.domain;
  imageUrl = environment.imageUri;
  currentUser$: Observable<IUser>;
  favours$: Observable<IFavour[]>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private popoverService: PopoverService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private proposalService: ProposalsService,
    private authService: AuthService,
    private requestService: RequestsService,
    private clipboardService: ClipboardService,
    private favourService: FavourService,
    private alertService: TwAlertService
  ) { }


  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    if (event.target.attributes.id?.nodeValue === 'menu') {
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.cdr.detectChanges();
  }


  ngOnInit(): void {
    this.tripId = this.activatedRoute.snapshot.params['id'];

    if (this.tripId) {
      this.sub = this.proposalService.getItemById(this.tripId)?.subscribe((res: any) => {
        if (res) {
          console.log(res);

          this.currentInitiative = res;
        }
      });
    }

    this.currentUser$ = this.authService.currentUser$;
    this.requests$ = this.requestService.requests$;
    this.favours$ = this.favourService.userFavours$;

  }


  isRequestSelected(requests: any[]): boolean {
    if (requests === null || requests.length === 0)
      return;

    const currentRequestLength = +requests.filter(z => +z.id === +this.tripId).length;
    if (currentRequestLength === 0)
      return false;

    else
      return true;
  }


  openChatWithAuthor() {
    // проверяем авторизован ли пользователь
    const isLogged = this.authService.logedIn();
    if (isLogged === false) {
      // показываем модалку с необходимостью авторизоваться
      const popoverData = this.popoverService.getPopoverStatus();
      popoverData.popoverType = PopoverTypes.get_auth;
      popoverData.status = true;
      popoverData.blackWrapper = true;
      this.popoverService.setPopoverStatus(popoverData);
      return;
    }

    const authorId = this.currentInitiative.data.attributes.authorId;
    const url = 'messenger/' + authorId;
    window.open(url, "_blank");

  }



  ngAfterContentChecked(): void {
  }


  ngOnDestroy(): void {
    this.deleteSub?.unsubscribe();
    this.sub!.unsubscribe();
    this.editFavourSub?.unsubscribe();
    this.subGetById?.unsubscribe();
  }





  copyToClipboard() {
    const URL = this.router.url;
    console.log(URL);
    this.clipboardService.copy(this.domainUrl + URL);
    let message = "Ссылка скопироварна в буфер обмена!";
    let alertSettings: IAlertSettings = {
      isVisible: true,
      message: message,
      icon: "thumb_up_white",
      timeout: 4500,
      color: IAlertType.green
    };
    this.alertService.apearAlert(alertSettings);
  }

  isLoading: boolean = false;
  onFavour() {
    // проверяем авторизован ли пользователь
    const isLogged = this.authService.logedIn();
    if (isLogged === false) {
      // показываем модалку с необходимостью авторизоваться
      const popoverData = this.popoverService.getPopoverStatus();
      popoverData.popoverType = PopoverTypes.get_auth;
      popoverData.status = true;
      popoverData.blackWrapper = true;
      this.popoverService.setPopoverStatus(popoverData);
      return;
    }


    this.isLoading = true;
    this.favourService.postFavourProposal(this.currentInitiative.data.id).subscribe((res: IFavour) => {
      if (res) {

        this.favourService.setFavour(res);
        let message = "Предложение добавлено в избранное!";
        let alertSettings: IAlertSettings = {
          isVisible: true,
          message: message,
          icon: "thumb_up_white",
          timeout: 4500,
          color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);

      }
    })

  }

  deleteFavour() {
    this.isLoading = true;
    this.favourService.deleteFavourProposal(this.currentInitiative.data.id).subscribe((res: IEntity) => {
      if (res) {

        this.favourService.removeFavour(res);
        let message = "Предложение удалено из избранного!";
        let alertSettings: IAlertSettings = {
          isVisible: true,
          message: message,
          icon: "thumb_up_white",
          timeout: 4500,
          color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    })

  }




  // https://auth.karavanglobal.space/api/profile/requests/add?strapiProposalNumber=157


}
