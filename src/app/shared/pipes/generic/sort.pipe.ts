import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(value: any[]): any[] {
      let newarr = value.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return newarr;
  }

}

