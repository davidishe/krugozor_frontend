
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../auth-models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-verify',
  templateUrl: './auth-verify.component.html',
  styleUrls: ['./auth-verify.component.scss']
})


export class AuthVerifyComponent implements OnInit {

  email: string;
  token: string;
  currentUser$: Observable<IUser>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    ) {
  }



  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });

    this.getToken();
    this.currentUser$ = this.authService.currentUser$;
    
  }


  getToken(): void {
    this.authService.getAuthToken(this.token, this.email).subscribe((res: any) => {
      if (res) {
        console.log(res.token);
        localStorage.setItem('app_token', res.token);
        const token = localStorage.getItem('app_token');
      }
    })


  }



}
