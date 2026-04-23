import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isDotExistsValidate(): ValidatorFn {
    
  return (control: AbstractControl): { [key: string]: any } | null => {
      const regex: RegExp = /\./i;
      // /\.[a-zA-Z]+/i;

      if (control.value && !regex.test(control.value)      
      ) {
          return { isDoteExistsError: true };
      }


  };
}
