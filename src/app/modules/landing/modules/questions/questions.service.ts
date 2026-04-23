import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  strapiUrl = environment.strapiUrl;
  authUri = environment.baseUri;



  constructor(
      public http: HttpClient,
  ) { 
  }


  sendFeedbackToServer(phoneNumber: string) {
    return this.http.get<any>(this.authUri + 'feedback/send?phone=' + phoneNumber);
  }



}
