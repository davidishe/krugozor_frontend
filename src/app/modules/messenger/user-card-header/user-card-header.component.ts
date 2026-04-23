import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../auth/auth-models/user';
import { IChat } from '../models/chat';


export interface ILastMessege {
  text: string;
}


@Component({
  selector: 'app-user-card-header',
  templateUrl: './user-card-header.component.html',
  styleUrls: ['./user-card-header.component.css']
})
export class UserCardHeaderComponent implements OnInit {

  @Input() userToShow: IUser;
  @Input() progress: boolean;
  @Input() isOnline: boolean;
  @Input() isOnlineStatusHidden: boolean;
  @Input() isSidebarMenu: boolean;
  @Input() isSelected: boolean;
  @Input() unreadMessages: number;
  @Input() chat: IChat;
  @Input() userId: number;
  @Input() lastMessage: string;

  constructor() { }

  ngOnInit() {
  }


  //TODO: fix
  public getUnreadMessages() {
    let messages = this.chat.messages.filter(x => x.isReaded === false && x.authorId !== this.userId);
    return messages.length;
  }


}
