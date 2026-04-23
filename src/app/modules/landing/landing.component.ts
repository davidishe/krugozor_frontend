import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStep, Status } from './models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild('promotion', {static: true}) element: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  scrollToElement(): void {
    // el.scrollIntoView();
      let el =  document.getElementById('promotion');
        el.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
          inline: 'center'
        });

  }

}
