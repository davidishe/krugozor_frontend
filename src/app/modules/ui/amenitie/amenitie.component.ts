import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-amenitie',
  templateUrl: './amenitie.component.html',
  styleUrls: ['./amenitie.component.scss']
})
export class AmenitieComponent implements OnInit {

  // @Input() amenitie: any;
  @Input() isPointerOn: boolean;
  @Input() isShadowHover: boolean;
  @Input() isShadowHoverDark: boolean;
  @Input() iconPath: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
