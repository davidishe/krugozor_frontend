import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponseData } from '../models/main/response';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUri = environment.baseUri;
  private responseDataSource = new BehaviorSubject<IResponseData>(null);
  responseData$ = this.responseDataSource.asObservable();

  constructor(
      public http: HttpClient,
  ) { }



  getById(id: number) {
    let locale;
    const curentLang = localStorage.getItem('default_lang');

    if (curentLang.includes('ru')) {
      locale = 'ru'
    }
    if (curentLang.includes('en')) {
      locale = 'en'
    }
    if (curentLang.includes('geo')) {
      locale = 'ka'
    }

    return this.http.get<any>(this.baseUri + 'proposals/' + id + '?populate=*' + '&locale=' + locale);
  }

  getMockData(): void {
    const array = [
      { }
    ]
    return 
  }


  getAllData(typeId?: string, categoryId?: string) {  
    let locale;
    const curentLang = localStorage.getItem('default_lang');
    if (curentLang.includes('ru')) {
      locale = 'ru'
    }
    if (curentLang.includes('en')) {
      locale = 'en'
    }
    if (curentLang.includes('geo')) {
      locale = 'ka'
    }


    let REQUEST_URL = 'proposals?populate=*';
    if (typeId) {
      REQUEST_URL = REQUEST_URL + '&filters[category][type][id][$eq]=' + typeId
    }

    if (categoryId) {
      REQUEST_URL = REQUEST_URL + '&filters[category][id][$eq]=' + categoryId
    }

    return this.http.get<any>(this.baseUri + REQUEST_URL + '&locale=' + locale).pipe(
      map((res: any) => {
        this.responseDataSource.next(null);
        this.responseDataSource.next(res);
        // this.stateService.setNavbarMenuStatusSpecific(false);
      }, (err: any) => {
      })
    ).subscribe((res: any) => {
      if (res) {
        return res;
      }
    });
  }


  

}
