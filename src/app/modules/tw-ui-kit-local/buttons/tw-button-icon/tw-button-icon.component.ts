import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-button-icon',
  templateUrl: './tw-button-icon.component.html',
  styleUrls: ['./tw-button-icon.component.scss']
})
export class TwButtonIconComponent implements OnInit {

  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
