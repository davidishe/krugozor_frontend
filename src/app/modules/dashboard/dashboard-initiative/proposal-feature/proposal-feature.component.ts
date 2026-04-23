import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProposalFeatureService } from './proposal-feature.service';

@Component({
  selector: 'app-proposal-feature',
  templateUrl: './proposal-feature.component.html',
  styleUrls: ['./proposal-feature.component.scss']
})
export class ProposalFeaturesComponent implements OnInit {

  @Input() title: string;
  @Input() isDefaultOpen: boolean;
  @Input() isDisabled: boolean = false;
  @Input() isOpened: boolean = false;
  featureStatus$: Observable<boolean>;

  

  constructor(
    private proposalFeatureService: ProposalFeatureService
  ) { }

  ngOnInit() {
    this.isOpened = this.isDefaultOpen;
    this.featureStatus$ = this.proposalFeatureService.featureStatus$;
  }

  toggleOpenStatus() {
    
    if(this.isDisabled)
      return false;

    this.isOpened = !this.isOpened;
  }
  

}
