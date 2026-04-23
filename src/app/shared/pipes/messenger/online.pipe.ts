import {Pipe, PipeTransform} from '@angular/core';
import { MessengerService } from 'src/app/modules/messenger/messenger.service';

@Pipe({
    name: 'online',
    pure: false,
})

export class MessengerOnlinePipe implements PipeTransform {

    constructor(
    private messengerService: MessengerService
    ) {
    }

    transform(userId: number, args?: any): any {
        const connections = this.messengerService.getOnlineConnections();
        return connections?.connectionItems?.filter(z => +z.userId === +userId)?.length > 0;
    }

    

}

