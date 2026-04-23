import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-problem-explanation-item',
  templateUrl: './landing-problem-explanation-item.component.html',
  styleUrls: ['./landing-problem-explanation-item.component.css']
})
export class LandingProblemExplanationItemComponent implements OnInit {

  @Input() icon: string;
  @Input() isReversed: boolean;

  constructor() { }

  ngOnInit() {
  }

}
