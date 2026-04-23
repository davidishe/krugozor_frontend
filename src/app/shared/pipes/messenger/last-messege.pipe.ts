import {Pipe, PipeTransform} from '@angular/core';
import { MessengerService } from 'src/app/modules/messenger/messenger.service';
import { IChat } from 'src/app/modules/messenger/models/chat';

@Pipe({
    name: 'last',
    pure: false,
})

export class LastMessegePipe implements PipeTransform {

    constructor(
        private messengerService: MessengerService
    ) {
    }


    transform(chat: IChat, isAutor: boolean, recepientId: number): any {

        const chatCommonStatus = this.messengerService.getOnlineConnections();
        const printingUsers = chatCommonStatus?.prtintingUsersItems;
        const isUserPrintings = printingUsers?.filter(z => +z.userId === +recepientId)?.length > 0;
        if(isUserPrintings)
            return "Печатает...";
        
        let lastMessege = chat.messages[chat.messages.length - 1];
        if(lastMessege?.withImages && isAutor)
            return "Ты отправил файл";

        
        if(lastMessege?.withImages && !isAutor)
            return "Вам отправили файл";

        else
            return lastMessege?.text;
    }

    

}

