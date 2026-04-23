import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlNameSpecialCharsValidate(): ValidatorFn {
    
  return (control: AbstractControl): { [key: string]: any } | null => {
      // const nameRegexp: RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

      // const regex = new RegExp("a|b", "i");
      const regex = new RegExp("“");
      const regex_5 = new RegExp(">");




      const regex_1 = new RegExp("«");
      const regex_2 = /»/i;
      const regex_3 = /‚/i;
      const regex_4 = new RegExp("<");
      const regex_6 = new RegExp("„");
      const regex_7 = /"/i;
      const regex_8 = new RegExp("'");
      const regex_9 = new RegExp("‹");
      const regex_10 = new RegExp("›");
      const regex_11 = new RegExp("{");
      const regex_12 = new RegExp("‹");
      const regex_13 = new RegExp("}");
      const regex_14 = new RegExp("]");
      const regex_15 = /\[/i;
      const regex_16 = /\|/i;


      if (control.value && regex.test(control.value)      
        || regex_1.test(control.value)      
        || regex_2.test(control.value)      
        || regex_3.test(control.value)      
        || regex_4.test(control.value)      
        || regex_5.test(control.value)      
        || regex_6.test(control.value)    
        || regex_7.test(control.value)      
        || regex_8.test(control.value)      
        || regex_9.test(control.value)      
        || regex_10.test(control.value)      
        || regex_11.test(control.value)      
        || regex_12.test(control.value)      
        || regex_13.test(control.value)      
        || regex_14.test(control.value)      
        || regex_15.test(control.value)   
        || regex_16.test(control.value)      


      ) {
          return { linkValidateError: true };
      }


  };
}
