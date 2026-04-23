import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlNameValidate(): ValidatorFn {
  
  return (control: AbstractControl): { [key: string]: any } | null => {
      const nameRegexp: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;

      if (control.value && !nameRegexp.test(control.value)) {
          return { linkValidateError: true };
      }

  };
}

// “„"'‚'«»<>‹›{}[]\|