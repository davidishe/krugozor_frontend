import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'datetimelocale'
})

export class DateTimeLocalePipe implements PipeTransform {

    /**
     *
     */
    constructor(
    private datePipe: DatePipe,
    private translate: TranslateService
    ) {
    }

    transform(value: any, args?: any): any {

        const current_lang = this.translate.getDefaultLang();
        if (value) {
            const converted_date = this.datePipe.transform(value, "hh:mm dd MMMM y", 'Europe/Moscow', current_lang);
            return converted_date;
        }
    }

}