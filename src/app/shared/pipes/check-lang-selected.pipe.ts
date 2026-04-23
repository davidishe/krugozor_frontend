import { DatePipe } from '@angular/common';
import {OnInit, Pipe, PipeTransform} from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParams } from 'src/app/models/main/query-params';

@Pipe({
    name: 'checkIsLangSelected'
})

export class CheckLangSelectedPipe implements PipeTransform {

    constructor(
    ) {
    }

    transform(id: number, selectedLangs: QueryParams[]): any {
        console.log(selectedLangs[id]);
        console.log(id);
        
        const checkIsExist = selectedLangs.filter(x => x.id === id).length;


        console.log('RES IS:  ' + checkIsExist);
        

        if (checkIsExist >= 1) {
            return true;
        }
        if (checkIsExist === 0) {
            return false;
        }

        // return false;
    }

}