import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos-element',
  templateUrl: './photos-element.component.html',
  styleUrls: ['./photos-element.component.scss']
})
export class PhotosElementComponent implements OnInit {
  @Input() image: any;
  constructor() { }

  ngOnInit() {
  }

}
