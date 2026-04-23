import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timepicker'
})

export class TimePickerPipe implements PipeTransform {

    /**
     *
     */
    constructor(
    ) {
    }

    transform(value: string, args?: any): any {

        
        if (value?.length === 0) {
            return value;
        }
        if (value?.length === 1) {
            return value;
        }
        if (value?.length === 2) {
            return value + ':';
        }
        if (value?.length === 3) {
            return value;
        }
        if (value?.length === 4) {
            return value;
        }
        if (value?.length === 5) {
            return value;
        }

    }

}