import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient) { }

  transform(url: string) {

    if(url === null)
      return;

    return new Observable<string | ArrayBuffer>((observer) => {
      // This is a tiny blank image
      // observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      // The next and error callbacks from the observer
      const {next, error} = observer;

      this.http.get(url, {responseType: 'blob'}).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function() {
          if(reader.result)
            observer.next(reader.result);
        };
      });

      return {unsubscribe() {  }};
    });
  }


}