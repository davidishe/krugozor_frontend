import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-proposal-page-cities-select-option',
  templateUrl: './my-proposal-page-cities-select-option.component.html',
  styleUrls: ['./my-proposal-page-cities-select-option.component.scss']
})
export class MyProposalPageCitiesSelectOptionComponent implements OnInit {

  @Input() isHovered: boolean;
  @Input() isSelected: boolean;


  constructor(
  ) { }
  
  ngOnInit() {
  }
  



}
