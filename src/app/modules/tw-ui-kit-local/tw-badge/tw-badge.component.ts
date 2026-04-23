import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-badge',
  templateUrl: './tw-badge.component.html',
  styleUrls: ['./tw-badge.component.scss']
})
export class TwBadgeComponent implements OnInit {

  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
