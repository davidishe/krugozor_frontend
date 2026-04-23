import { Pipe, PipeTransform } from '@angular/core';
import { ICategoryParam, QueryParams } from 'src/app/models/main/query-params';

@Pipe({
  name: 'breadcrumbsselector',
  pure: false
})
export class StrapiBreadcrumbsSelectorPipe implements PipeTransform {

  prevResult: any;

  constructor(
  ) {
  }


  transform(categorys: ICategoryParam[]): any {
    
    let result: any;
    console.log(categorys);
    

    
    if (categorys?.length === 0) {
      result = []; return;
    }
    
    // if(categorys[queryParams.curentCategorysLevel]?.attributes?.categories === undefined) {
    //   result = []; return;
    // }

    // if(categorys[queryParams.curentCategorysLevel]?.attributes === undefined) {
    //   result = []; return
    // }
    
    

    result = categorys;
    // [0]?.attributes?.categories.data;


    return result;
    

    

  }







}
