import { AbstractControl, ValidatorFn } from '@angular/forms';

export function userNameValidate(userName: string): ValidatorFn {
  
  return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      

      if (value && value.match(/user[0-9]/) && !value.match(/user\d[0-9]+[a-z]/) && userName !== value) {
          return { usernamePattern: true };
      }
      // value.match(/[A-Z]/)

  };
}