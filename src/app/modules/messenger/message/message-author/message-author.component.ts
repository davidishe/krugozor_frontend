import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-author',
  templateUrl: './message-author.component.html',
  styleUrls: ['./message-author.component.css']
})
export class MessageAuthorComponent implements OnInit {
  
  @Input() isMyMessage: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
