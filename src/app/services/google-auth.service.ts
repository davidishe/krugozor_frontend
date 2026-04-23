import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

private auth2: any;
private userSubject = new  ReplaySubject<gapi.auth2.GoogleUser>(1);

constructor() {
  gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
      client_id: '263769089352-26v7o8794c42njl3u591acssfsuo0th3.apps.googleusercontent.com',
      redirect_uri: 'https://localhost:4200/auth/login',
      scope: 'https://www.googleapis.com/auth/userinfo.profile'
    })
  })
}

public signIn(): void {
  console.log(123131313131);
  
    this.auth2.signIn((res: any) => {
      
    }).then(user => {
      if (user) {
        console.log(user);
        this.userSubject.next(user);
      }
    }).catch((err: any) => {
      console.log(err);
    });
}


public signOut(): void {
  this.auth2.signOut().then( () => {

  }).catch(() => {

  });
}


public observable(): Observable<gapi.auth2.GoogleUser> {
  return this.userSubject.asObservable();
}

}
