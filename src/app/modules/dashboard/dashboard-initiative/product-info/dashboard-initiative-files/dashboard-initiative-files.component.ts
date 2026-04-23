import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-initiative-files',
  templateUrl: './dashboard-initiative-files.component.html',
  styleUrls: ['./dashboard-initiative-files.component.css']
})
export class DashboardInitiativeFilesComponent implements OnInit {

  @Input() proposalProfile: any;
  constructor() { }

  ngOnInit() {
  }

}
