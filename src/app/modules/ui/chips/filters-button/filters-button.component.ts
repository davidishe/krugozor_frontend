import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters-button',
  templateUrl: './filters-button.component.html',
  styleUrls: ['./filters-button.component.css']
})
export class FiltersButtonComponent implements OnInit {

  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
