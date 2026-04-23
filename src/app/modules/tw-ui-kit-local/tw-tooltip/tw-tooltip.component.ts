import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-tooltip',
  templateUrl: './tw-tooltip.component.html',
  styleUrls: ['./tw-tooltip.component.scss']
})
export class TwTooltipComponent implements OnInit {

  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }

}
