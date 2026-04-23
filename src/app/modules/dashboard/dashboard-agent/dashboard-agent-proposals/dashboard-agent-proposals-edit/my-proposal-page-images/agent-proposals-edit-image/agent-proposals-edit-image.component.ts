import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-proposals-edit-image',
  templateUrl: './agent-proposals-edit-image.component.html',
  styleUrls: ['./agent-proposals-edit-image.component.css']
})
export class AgentProposalsEditImageComponent implements OnInit {

  @Input() imagePath: string;
  constructor() { }

  ngOnInit() {
  }

}
