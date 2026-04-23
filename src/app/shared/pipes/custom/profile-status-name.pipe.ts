import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profile_status'
})

export class ProfileStatusNamePipe implements PipeTransform {

  transform(statusId: number) {


  
    if(statusId === null)
      return;

    // if(statusId === 1) {
    //   return {
    //     name: 'Старт проекта',
    //     icon: 'tw_time_black',
    //     color: 'red'
    //   }
    // }

    if(statusId === 1) {
      return {
        name: 'Сбор заявок',
        icon: 'tw_time_black',
        color: 'red'
      }
    }

    if(statusId === 2)
      return {
        name: 'Заявки собраны',
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

  

    if(statusId === 5)
      return {
        name: 'Объект отозван',
        icon: 'tw_close_circe_black',
        color: 'red'
      }

  
    return '';
  }


}