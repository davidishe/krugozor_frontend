import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUser } from 'src/app/modules/auth/auth-models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable({  providedIn: 'root'})

export class AuthGuard implements CanActivate {

  currentUser!: IUser;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (this.authService.isAuthenticated()) {
        
        return true;
      } else {
        this.router.navigate([ 'auth/login']);
        return false;
      }


  };


  openSnackBar(message: string) {
  }

}
