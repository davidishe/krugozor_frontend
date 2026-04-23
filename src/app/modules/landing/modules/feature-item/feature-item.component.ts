import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-item',
  templateUrl: './feature-item.component.html',
  styleUrls: ['./feature-item.component.css']
})
export class FeatureItemComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
