import { Component, Input, OnInit } from '@angular/core';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-nothing-added',
  templateUrl: './nothing-added.component.html',
  styleUrls: ['./nothing-added.component.scss']
})
export class NothingAddedComponent implements OnInit {

  isLoading: boolean = false;
  @Input() textTitle!: string;
  @Input() textSubTitle!: string;
  @Input() textBtnTitle!: string;

  constructor(
  ) { }

  ngOnInit() {
  }



}
