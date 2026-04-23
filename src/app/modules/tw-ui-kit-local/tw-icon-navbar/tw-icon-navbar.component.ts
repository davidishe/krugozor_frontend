import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-icon-navbar',
  templateUrl: './tw-icon-navbar.component.html',
  styleUrls: ['./tw-icon-navbar.component.scss']
})
export class TwIconNavbarComponent implements OnInit {

  @Input() icon?: string;
  constructor() { }

  ngOnInit() {
  }

}
