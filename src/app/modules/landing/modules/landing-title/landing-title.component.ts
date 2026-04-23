import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-title',
  templateUrl: './landing-title.component.html',
  styleUrls: ['./landing-title.component.css']
})
export class LandingTitleComponent implements OnInit {
  @Input() isDarkTheme: boolean;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}
