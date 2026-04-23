import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-badge-small',
  templateUrl: './tw-badge-small.component.html',
  styleUrls: ['./tw-badge-small.component.css']
})
export class TwBadgeSmallComponent implements OnInit {

  @Input() isGreen: boolean;
  @Input() isRed: boolean;
  @Input() isYellow: boolean;
  @Input() isGray: boolean;


  
  constructor() { }

  ngOnInit() {
  }

}
