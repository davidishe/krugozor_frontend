import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'datetimepicker'
})

export class DateTimePickerPipe implements PipeTransform {

    /**
     *
     */
    constructor(
    private datePipe: DatePipe
    ) {
    }

    transform(value: any, args?: any): any {
        if (value) {
            const converted_date = this.datePipe.transform(value, "dd MMMM y", 'Europe/Moscow', 'en');
            return converted_date;
        }
    }

}