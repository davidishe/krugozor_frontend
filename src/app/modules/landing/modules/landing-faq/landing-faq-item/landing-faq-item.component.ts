import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-faq-item',
  templateUrl: './landing-faq-item.component.html',
  styleUrls: ['./landing-faq-item.component.css']
})
export class LandingFaqItemComponent implements OnInit {
  
  @Input() item: any;
  // @Input() isExpanded: boolean;


  constructor() { }

  ngOnInit() {
  }

}
