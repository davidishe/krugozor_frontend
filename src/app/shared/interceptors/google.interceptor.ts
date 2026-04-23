/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';


@Injectable()
export class GooglePlacesInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.url.includes('googleapis.com/maps/api/place/queryautocomplete')) {
      console.log('FROM INTERCEPTOR');

      let headers = new Headers();
      req.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      req.headers.append('Content-Type', 'application/json');
      req.headers.append('Accept', 'application/json');
      req.headers.append('Access-Control-Allow-Origin', 'https://localhost:4200');
      req.headers.append('Access-Control-Allow-Credentials', 'true');
      req.headers.append('GET', 'OPTIONS');


      return next.handle(req);
    }
    req.headers.append('Access-Control-Allow-Origin', '*');
    req.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return next.handle(req);
  }
}
