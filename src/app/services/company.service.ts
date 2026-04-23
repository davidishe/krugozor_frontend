import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStrapiDto } from '../models/main/dtos';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  strapiUrl = environment.strapiUrl;
  backendUri = environment.baseUri;

  constructor(
        public http: HttpClient,
  ) { }


  getLocal(): string {
    const curentLang = localStorage.getItem('default_lang');

    
    if (curentLang!.includes('en'))
    return 'en';
  
    if (curentLang!.includes('geo'))
      return 'ka';
    
    else (curentLang!.includes('ru'))
      return 'ru';

  }

  getCompanyById(id: number) {
    let locale = this.getLocal();
    return this.http.get(this.strapiUrl + 'companies/' + id + '?populate=deep,3&locale=' + locale);
  }


  
  saveCompany(strapiDto: IStrapiDto) {
    // let locale = this.getLocal();
    return this.http.put<any>(this.backendUri + 'strapi/update/company', strapiDto);
  }


  createOrUpdateItemWithStrapi(strapiDto: IStrapiDto) {
    // let locale = this.getLocal();
    return this.http.put<any>(this.backendUri + 'strapi/update/company', strapiDto);
  }

}
