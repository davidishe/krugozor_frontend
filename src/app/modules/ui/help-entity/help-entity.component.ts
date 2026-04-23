import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-entity',
  templateUrl: './help-entity.component.html',
  styleUrls: ['./help-entity.component.scss']
})
export class HelpEntityComponent implements OnInit {

  @Input() text_body: string;
  @Input() text_title: string;
  @Input() video_link: string;
  expanded: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }

}
