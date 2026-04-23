import {Pipe, PipeTransform} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'language'
})

export class LanguagePipe implements PipeTransform {


    curentLanguage!: string;

    constructor(
        private translateService: TranslateService
    ) {        
    }

    transform(): any {
        const curentLanguage: string = this.translateService.getDefaultLang();
        console.log(curentLanguage);

    }

}