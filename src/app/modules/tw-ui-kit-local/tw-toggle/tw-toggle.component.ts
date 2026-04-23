import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tw-toggle',
  templateUrl: './tw-toggle.component.html',
  styleUrls: ['./tw-toggle.component.css']
})
export class TwToggleComponent implements OnInit {

  
  @Input() isEnabled: boolean;
  @Input() enabledText: string;
  @Input() disabledText: string;
  @Output() getToggleStatus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    this.getToggleStatus.emit(this.isEnabled)
  }

}
