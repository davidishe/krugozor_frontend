import { Pipe, PipeTransform } from '@angular/core';
import { QueryParams } from 'src/app/models/main/query-params';

@Pipe({
  name: 'breadcrumbs',
  pure: false
})
export class StrapiBreadcrumbsPipe implements PipeTransform {

  prevResult: any;

  constructor(
  ) {
  }


  transform(queryParams: QueryParams): any {
    
    let result: any;
    
    if (queryParams.categorys?.length === 0) {
      result = []; return;
    }
    
    if(queryParams.categorys[queryParams.curentCategorysLevel]?.attributes?.categories === undefined) {
      result = []; return;
    }

    if(queryParams.categorys[queryParams.curentCategorysLevel]?.attributes === undefined) {
      result = []; return
    }
    
    

    result = queryParams.categorys[queryParams.curentCategorysLevel]?.attributes?.categories.data;


    return result;
    

    

  }







}
