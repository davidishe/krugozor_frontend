import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-information',
  templateUrl: './place-information.component.html',
  styleUrls: ['./place-information.component.scss']
})
export class PlaceInformationComponent implements OnInit {

  @Input() amenities: any[] = [];  
  

  constructor(
  ) { }

  ngOnInit() {
  }

}
