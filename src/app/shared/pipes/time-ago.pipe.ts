import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'DateAgoPipe'
})

export class DateAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const hours = value / 60;
            const hours_conveted = Math.floor(hours);
            const minutes = value % 60;
            
            let result;

            // TODO: transform to switch
            if (hours_conveted === 1 || hours_conveted === 0) { 
                result = hours_conveted + ' час ';
            }
            
            if (hours_conveted === 2 ||
                hours_conveted === 3 ||
                hours_conveted === 4 ) {
                result = hours_conveted + ' часа ';
            } 
            if (hours_conveted > 4) {
                result = hours_conveted + ' часов ';
            }

            if (result === undefined)
                    return;

            result = result + Math.floor(minutes) + ' минут'
            return result;
            
        }

    }

}