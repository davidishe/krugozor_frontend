import { DatePipe } from '@angular/common';
import {OnInit, Pipe, PipeTransform} from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParams } from 'src/app/models/main/query-params';

@Pipe({
    name: 'checkIsCitySelected'
})

export class CheckCitySelectedPipe implements PipeTransform {

    constructor(
    ) {
    }

    transform(id: number, citysSelectedLangs: QueryParams[]): any {
        console.log(citysSelectedLangs);
        const checkIsExist = citysSelectedLangs.filter(x => x.id === id).length;
        if (checkIsExist >= 1) {
            return true;
        }
        if (checkIsExist === 1) {
            return false;
        }

        return false;
    }

}