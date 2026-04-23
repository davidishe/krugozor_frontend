/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const token = localStorage.getItem('app_token');
    if (token 
            && !req.url.includes('https://localhost:4200/libs/index.html') 
            && !req.url.includes('http://localhost:1338') 
            && !req.url.includes('https://strapi.krugozor.space') 
            && !req.url.includes('googleapis') 
            && !req.url.includes('kissht.com')) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
      });
      req.headers.append('Access-Control-Allow-Origin', '*');
      req.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
      return next.handle(req);
    }

    req.headers.append('Access-Control-Allow-Origin', '*');
    req.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return next.handle(req);
  }
}
