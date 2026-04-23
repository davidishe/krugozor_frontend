import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isDotExistsWithDomainCirillicValidate(): ValidatorFn {
    
  return (control: AbstractControl): { [key: string]: any } | null => {
      const regex: RegExp = /[a-zа-я0-9]+([\-\.]{1}[a-zа-я0-9]+)*\.[a-zа-я]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

      if (control.value && (!regex.test(control.value))) {
          return { isDoteExistsError: true };
      }


  };
}
