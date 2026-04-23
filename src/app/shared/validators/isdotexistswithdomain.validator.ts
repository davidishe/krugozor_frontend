import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isDotExistsWithDomainValidate(): ValidatorFn {
    
  return (control: AbstractControl): { [key: string]: any } | null => {
      const regex: RegExp = /\.[a-zA-Z][a-zA-Z]/i;

      if (control.value && !regex.test(control.value)      
      ) {
          return { isDoteExistsError: true };
      }


  };
}
