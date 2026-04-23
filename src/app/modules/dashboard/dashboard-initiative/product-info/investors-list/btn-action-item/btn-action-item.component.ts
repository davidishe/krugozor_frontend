import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-action-item',
  templateUrl: './btn-action-item.component.html',
  styleUrls: ['./btn-action-item.component.css']
})
export class BtnActionItemComponent implements OnInit {

  @Input() isDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
