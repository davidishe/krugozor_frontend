import { AbstractControl, ValidatorFn } from '@angular/forms';

export function restrictNumbers(): ValidatorFn {
  const digits: RegExp = /[0-9]/;

  
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && digits.test(control.value)) {
        return { digits_restricted: true };
      }

      return null;

  };
}