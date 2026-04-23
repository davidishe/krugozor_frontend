import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent implements OnInit {

  @Input() title: string;
  
  constructor() { }

  ngOnInit() {
  }

}
