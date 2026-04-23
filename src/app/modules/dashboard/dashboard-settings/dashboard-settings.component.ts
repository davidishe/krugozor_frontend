import { Component, OnInit } from '@angular/core';
import { IUser } from '../../auth/auth-models/user';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.css']
})
export class DashboardSettingsComponent implements OnInit {

  user$: Observable<IUser>;

  constructor(
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.user$ = this.authService.currentUser$;
  }




}
