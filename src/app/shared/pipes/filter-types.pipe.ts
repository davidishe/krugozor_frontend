import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter_types',
  pure: false
})
export class FilterTypesPipe implements PipeTransform {

  constructor() { }

  transform(allTypes: any[], selectedTypes: any[]) {
  
    // request-status-name
    let result: any[] = [];
    result = allTypes;
    
    selectedTypes.forEach(selectedType => {
      result = result.filter(z => +z.id !== +selectedType.id);
    });


    return result;
  }


}