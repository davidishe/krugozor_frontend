import { Component, Input, OnInit } from '@angular/core';
import { IStrapiProposalAttributes } from 'src/app/models/main/proposal';

@Component({
  selector: 'app-tw-card-skeleton',
  templateUrl: './tw-card-skeleton.component.html',
  styleUrls: ['./tw-card-skeleton.component.scss']
})
export class TwCardSkeletonComponent implements OnInit {

  @Input() item: IStrapiProposalAttributes;

  constructor() { }

  ngOnInit() {
  }

}
