import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'request_status'
})

export class RequestStatusNamePipe implements PipeTransform {

  transform(statusId: number) {
  
    if(statusId === null)
      return;

    if(statusId === 1) {
      return {
        name: 'На рассмотрении',
        icon: 'tw_time_black',
        color: 'red'
      }
    }

    if(statusId === 2)
      return {
        name: 'Предварительно одобрена',
        icon: 'tw_info_blaack',
        color: 'red'
      }


    if(statusId === 3)
      return {
        name: 'Выход на сделку',
        icon: 'tw_info_blaack',
        color: 'red'
      }

    if(statusId === 4)
      return {
        name: 'Объект продан',
        icon: 'tw_info_blaack',
        color: 'red'
      }

  

    if(statusId === 6)
      return {
        name: 'Отказ от сделки',
        icon: 'tw_close_circe_black',
        color: 'red'
      }

  
    return '';
  }


}