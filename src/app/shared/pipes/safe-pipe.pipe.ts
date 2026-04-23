import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string) {
      var parser = new DOMParser();
      var parsed_html = parser.parseFromString(value, 'text/html');
      var clean_p = parsed_html.getElementsByTagName("p");
      var clean_h2 = parsed_html.getElementsByTagName("h1");
      var clean_h1 = parsed_html.getElementsByTagName("h1");

      
      let res = [];
      var length = clean_p.length;

      for (let index = 0; index < length; index++) {
        const element = clean_p.item(index);
        if(element)
          res.push(element.innerText);
      }

      let result: string = '';
      res.forEach(item => {
        result = result + ' ' + item;
      });
      return result;

  }
} 