import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-autocomplete-select-option',
  templateUrl: './tw-autocomplete-select-option.component.html',
  styleUrls: ['./tw-autocomplete-select-option.component.scss']
})
export class TwAutocompleteSelectOptionComponent implements OnInit {

  @Input() isHovered!: boolean;
  @Input() isSelected!: boolean;


  constructor(
  ) { }
  
  ngOnInit() {
  }
  



}
