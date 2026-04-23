import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.css']
})
export class FormTextInputComponent implements OnInit {

  @Input() label: string;
  @Input() value: string;
  @Input() control_name!: string;
  @Input() form_ControlName: string;
  @Input() form!: FormGroup;
  @Input() placeholder: string;
  @Input() isWithIcon: boolean;
  @Input() icon: string;
  @Input() type: string;
  @Output() notify = new EventEmitter<any>();
  @Output() notifyWhenEnterEmiter = new EventEmitter<any>();


  
  constructor() { }
  
  notifyWhenChanged() {
    // console.log(this.form.get(this.form_ControlName).value);
    this.notify.emit(this.form.get(this.form_ControlName).value);
  }

  notifyWhenEnter() {
    this.notifyWhenEnterEmiter.emit(this.form.get(this.form_ControlName).value);
  }

  ngOnInit() {
  }


}
