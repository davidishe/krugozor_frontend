import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class UrlHelperService {
    constructor(
        private http: HttpClient, /* Your favorite Http requester */
    ) {
    }

    get(url: string): Observable<any> {
        return new Observable((observer: Subscriber<any>) => {
            let objectUrl: string = null;

            this.http
                .get(url, {
                    headers: this.getHeaders(),
                    responseType: 'blob'
                })
                .subscribe(m => {
                    objectUrl = URL.createObjectURL(m);
                    observer.next(objectUrl);
                });

            return () => {
                if (objectUrl) {
                    URL.revokeObjectURL(objectUrl);
                    objectUrl = null;
                }
            };
        });
    }

    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();

        ////let token = this.authService.getCurrentToken();
        let token = { access_token:  localStorage.getItem('app_token')}; // Get this from your auth service.

        if (token) {
            headers.set('Authorization', 'Bearer ' + token.access_token);
        }

        return headers;
    }
}