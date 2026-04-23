import {Pipe, PipeTransform} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { min } from 'rxjs/operators';

@Pipe({
    name: 'TimeAgoProposalPipe'
})

export class TimeAgoProposalPipe implements PipeTransform {

    /**
     *
     */
    constructor(
        private translate: TranslateService
    ) {
    }


    transform(value: any): any {
        if (value) {

            let result_text = '';
            
            const hours = value / 60;
            const hours_conveted = Math.floor(hours);
            
            const minutes = hours_conveted % 60;
            const hours_result = (hours_conveted - minutes) / 60;
            
            var hours_last_char = hours_result.toString()[+hours_result.toString().length - 1];

            const hour_postfix = this.translate.instant('globals.postfix.hour_postfix') // ' час ';
            const hours_postfix = this.translate.instant('globals.postfix.hours_postfix')  // ' часа '
            const hours_many_postfix = this.translate.instant('globals.postfix.hours_many_postfix')  // ' часов '

            const minute_one_postfix = this.translate.instant('globals.postfix.minute_one_postfix') // ' минута ';
            const minutes_postfix = this.translate.instant('globals.postfix.minutes_postfix') // ' минуты ';
            const minutes_many_postfix = this.translate.instant('globals.postfix.minutes_many_postfix') //' минут '

            

            if (+hours_last_char === 1) {
                result_text = (hours_result) + hour_postfix;
            }
            
            if (+hours_last_char > 1 && +hours_last_char <= 4) {
                result_text = (hours_result) + hours_postfix;
            }

            if (+hours_last_char >= 5 && +hours_last_char <= 9) {
                result_text = (hours_result) + hours_many_postfix;
            }

            let minutes_result = '';
            var minutes_last_char = minutes.toString()[+minutes.toString().length - 1];


            if (+minutes_last_char === 0) {
                minutes_result = '';
            }

            if (+minutes_last_char === 1) {
                minutes_result = minutes + minute_one_postfix;
            }

            if (+minutes_last_char >= 2 && +minutes_last_char <= 4) {
                minutes_result = minutes + minutes_postfix;
            }

            if (+minutes_last_char >= 5 && +minutes_last_char <= 9) {
                minutes_result = minutes + minutes_many_postfix;
            }

            return result_text + minutes_result;

            
        }
    }

}