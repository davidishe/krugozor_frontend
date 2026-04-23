import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-item-header-section',
  templateUrl: './dashboard-item-header-section.component.html',
  styleUrls: ['./dashboard-item-header-section.component.scss']
})
export class DashboardItemHeaderSectionComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() locations: any[];
  isOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
