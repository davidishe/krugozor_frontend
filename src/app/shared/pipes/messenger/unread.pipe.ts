import {Pipe, PipeTransform} from '@angular/core';
import { MessengerService } from 'src/app/modules/messenger/messenger.service';
import { IChat } from 'src/app/modules/messenger/models/chat';

@Pipe({
    name: 'unread',
    pure: false,
})

export class UnreadMessagesPipe implements PipeTransform {

    constructor(
    ) {}

    transform(chat: IChat, userId: number, args?: any): any {
        if(!userId)
            return;
        if(!chat)
            return;
    
        let messages = chat.messages.filter(x => x.isReaded === false && +x.authorId !== +userId);
        return messages.length;
    }

    

}

