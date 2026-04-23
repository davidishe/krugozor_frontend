import { AbstractControl, ValidatorFn } from '@angular/forms';

export function kirilizaValidate(): ValidatorFn {
  const nameRegexp: RegExp = /[а-яё]+/i;
  
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && nameRegexp.test(control.value)) {
        return { kirilliza_restricted: true };
      }

  };
}