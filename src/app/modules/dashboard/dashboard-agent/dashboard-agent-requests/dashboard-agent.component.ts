import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AgentService } from './agent.service';
import { IRequest } from '../../requests/requests.models';

@Component({
  selector: 'app-dashboard-agent',
  templateUrl: './dashboard-agent.component.html',
  styleUrls: ['./dashboard-agent.component.scss']
})
export class DashboardAgentComponent implements OnInit, OnDestroy {

  // orders: IRequest[] = [];
  sub: Subscription;
  subGrade: Subscription;
  allSpecificAgentProposals: any[];
  partnerId: number;
  isLoading: boolean = true;
  panelState$: Observable<boolean>;
  bodyElement$: Observable<ElementRef>;
  currentOrder: IRequest;
  currentProposal$: Observable<any>;



  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private agentService: AgentService,
  ) { }

  ngOnInit() {

    this.partnerId = this.activatedRoute.snapshot.params['id'];
    this.isLoading = true;
    
    this.sub = this.agentService.getRequestsForSpecificAgentPage().subscribe((res: any) => {
      if (res) {
        this.allSpecificAgentProposals = res;
        this.isLoading = false;
      }
    });

  }




  ngAfterViewChecked(): void {
  }



  ngOnDestroy(): void {
    this.sub!.unsubscribe();
    this.subGrade?.unsubscribe();
    this.cdr.detectChanges();
  }

}
