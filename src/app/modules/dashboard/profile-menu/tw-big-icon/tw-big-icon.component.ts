import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tw-big-icon',
  templateUrl: './tw-big-icon.component.html',
  styleUrls: ['./tw-big-icon.component.scss']
})
export class TwBigIconComponent implements OnInit {
  
  @Input() iconPath: string;
  @Input() title: string;
  @Input() description: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
