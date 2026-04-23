import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-participant-roles',
  templateUrl: './landing-participant-roles.component.html',
  styleUrls: ['./landing-participant-roles.component.css']
})
export class LandingParticipantRolesComponent implements OnInit {
  
  @Input() title: string;
  @Input() text1: string;
  @Input() text2: string;
  @Input() text3: string;
  @Input() imgPathSmall: string;
  @Input() imgPathBig: string;


  constructor() { }

  ngOnInit() {
  }

}
