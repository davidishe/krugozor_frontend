import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-icon',
  templateUrl: './tw-icon.component.html',
  styleUrls: ['./tw-icon.component.scss']
})
export class TwIconComponent implements OnInit {

  @Input() icon?: string;
  constructor() { }

  ngOnInit() {
  }

}
