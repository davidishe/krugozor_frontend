import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { IPopoverData } from './popover';
import { PopoverService } from './popover.service';
import { ProposalsService } from 'src/app/services/proposals.service';
import { QueryParams } from 'src/app/models/main/query-params';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit, OnDestroy {
  
  popoverState$!: Observable<IPopoverData | null>;
  queryParams$!: Observable<QueryParams | null>;


  constructor(
    private popoverService: PopoverService,
    private router: Router,
    private proposalService: ProposalsService,
    private translateService: TranslateService,
  ) {
  }
  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
    this.popoverState$ = this.popoverService.popoverState$;
    this.queryParams$ = this.proposalService.queryParams$;
    
  }

  closePopover(): void {
    const popoverData = this.popoverService.getPopoverStatus();
    popoverData!.popoverType = null;
    popoverData!.status = false;
    if(popoverData)
      this.popoverService.setPopoverStatus(popoverData);
  }



}