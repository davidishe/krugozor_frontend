import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'age'
})

export class AgePipe implements PipeTransform {

    /**
     *
     */
    constructor(
    private datePipe: DatePipe
    ) {
    }

    transform(birthday: any, args?: any): any {
        if (birthday) {
            const date = new Date(birthday);
            var ageDifMs = Date.now() - date.getTime();
            var ageDate = new Date(ageDifMs);
            let result = Math.abs(ageDate.getUTCFullYear() - 1970);
            return this.agetostr(result);
        }
    }


    agetostr(age: any) {
        var txt;
        let count = age % 100;
        if (count >= 5 && count <= 20) {
            txt = 'лет';
        } else {
            count = count % 10;
            
            if (count == 1)
                txt = 'год';
            
                else if (count >= 2 && count <= 4)
                txt = 'года';
            
                else 
                txt = 'лет';
            
        }
        return age + " " + txt;
    }
    

}

