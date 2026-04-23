import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-with-hint',
  templateUrl: './btn-with-hint.component.html',
  styleUrls: ['./btn-with-hint.component.css']
})
export class BtnWithHintComponent implements OnInit {
  @Input() investorRequest: any;
  @Input() hintText: string;
  @Input() icon: string;
  
  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onHover() {
    this.isVisible = true;
  }

  onBlur() {
    this.isVisible = false;
  }

}
