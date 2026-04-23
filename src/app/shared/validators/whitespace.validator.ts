import { AbstractControl, ValidatorFn } from '@angular/forms';

export function whiteSpaceValidate(): ValidatorFn {
  const nameRegexp: RegExp = /\s/;
  
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && nameRegexp.test(control.value)) {
        return { whitespace_restricted: true };
      }

  };
}