import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'datetimeproposalpipe'
})

export class DateTimeProposalPipe implements PipeTransform {

    /**
     *
     */
    constructor(
    private datePipe: DatePipe
    ) {
    }

    transform(unix_timestamp: any, args?: any): any {
        if (unix_timestamp) {
            var date = new Date(unix_timestamp * 1000);
            var short_date = this.datePipe.transform(date, "d MMMM, h:mm", 'Europe/Moscow', 'ru');
            return short_date;

        }
    }

}