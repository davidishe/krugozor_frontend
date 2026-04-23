import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParams } from 'src/app/models/main/query-params';
import { IItem, IResponseData } from 'src/app/models/main/response';
import { MapService } from 'src/app/services/map.service';
import { ProposalsService } from 'src/app/services/proposals.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  items: any[] = [];
  isPopualarAvailable: boolean = true;
  responseData$: Observable<IItem[]>;
  proposalTypes$: Observable<any[]>;
  navbarMenuStatus$: Observable<Boolean>;
  currentStatus: boolean = false;
  isLoading: boolean = false;
  params$: Observable<QueryParams>;
  imageUri = environment.imageUri;



  constructor(
    public proposalService: ProposalsService,
    private cdr: ChangeDetectorRef,
    private mapService: MapService,
  ) {

  }


  ngAfterViewChecked(): void {
  }


  ngOnInit() {
    this.responseData$ = this.proposalService.responseData$;
    this.proposalTypes$ = this.proposalService.proposalTypes$;
    this.params$ = this.proposalService.queryParams$;
  }


  getAllDataWithFilters() {
    this.proposalService.getAllDataWithGQL();
  }



  errorImage(img, lat, lng) {
    img.src = this.mapService.getMapUrl(lat, lng, '1500x500');
  }


  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }






  ngOnDestroy(): void {
  }



}
