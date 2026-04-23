import { AbstractControl, ValidatorFn } from '@angular/forms';

export function restrictUpperCase(): ValidatorFn {
  
  return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      

      if (value && value.match(/[A-Z]/)) {
          return { upper_case_error: true };
      }
      // value.

  };
}