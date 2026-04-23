import { AbstractControl, ValidatorFn } from '@angular/forms';

export function restrictSpecCharacters(): ValidatorFn {
  // const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  // ^(?!user(\d*))$
  const nameRegexp: RegExp = /[!@#$%^№&*()_+\=\[\]{};':"\\|,.<>\/?]/;


  
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && nameRegexp.test(control.value)) {
        return { spec_chars: true };
      }

      return null;

  };
}