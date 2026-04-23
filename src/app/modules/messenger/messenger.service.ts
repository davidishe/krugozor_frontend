import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMessage } from './models/message';
import { IChat } from './models/chat';
import { ICommonChatStatus } from './models/common-status';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/auth-models/user';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private chatsDataSource = new BehaviorSubject<IChat[]>([]);
  chatsData$ = this.chatsDataSource.asObservable();

  // private messagesDataSource = new BehaviorSubject<IMessage[]>([]);
  // messagesData$ = this.messagesDataSource.asObservable();

  private commonChatDataSource = new BehaviorSubject<ICommonChatStatus>(null);
  onlineUsersData$ = this.commonChatDataSource.asObservable();

  constructor(
    private authService: AuthService
  ) { }

  public getChats() {
    return this.chatsDataSource.value;
  }

  public setChats(items: IChat[]) {
    this.chatsDataSource.next(items);
  }

  public updateSpecificChat(chat: IChat) {
    let chats = this.chatsDataSource.value;
    chats = chats.filter(x => +x.id !== +chat.id);
    chats.push(chat);
    this.chatsDataSource.next(chats);
  }

  public appendNewMessageInChat(message: IMessage, destinationUser: IUser) {
    let chatData = this.chatsDataSource.value;
    let chatToUpdate: IChat = chatData.filter(x => +x.id === +message.chatId)[0];

    if(+chatData.length === 0) {
      let newChatData: IChat[] = [];
      const user = this.authService.getCurrentUserValue();

      const newChat: IChat = {
        id: message.id,
        messages: [],
        recepientId: destinationUser.id,
        authorId: user.id,
        createdAt: message.createdAt,
        destinationUser: destinationUser,
        updatedAt: message.createdAt,
        authorUser: user
      };
      newChat.messages.push(message);
      
      newChatData.push(newChat);
      this.chatsDataSource.next(newChatData);
      console.log(this.chatsDataSource.value);
      return;
    }
  
    chatToUpdate.updatedAt = message.createdAt;

    const isExist = chatToUpdate.messages.filter(x => x.guId.includes(message.guId) === true).length === 0;
    if(isExist)
      chatToUpdate.messages.push(message);
  
    chatData = chatData.filter(x => x.id !== message.chatId);
    chatData.push(chatToUpdate);

    this.chatsDataSource.next(chatData);
  }

  // public setNewMessagesBulk(messages: IMessage[]) {
  //   this.messagesDataSource.next(messages);
  // }

  // public getDataset() {
  //   return this.messagesDataSource.value;
  // }


  public getOnlineConnections() {
    return this.commonChatDataSource.value;
  }

  public setCommonChatData(data: ICommonChatStatus) {
    return this.commonChatDataSource.next(data);
  }

}
