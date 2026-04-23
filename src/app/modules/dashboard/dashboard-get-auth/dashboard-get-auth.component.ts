import { Component, OnInit } from '@angular/core';
import { PopoverService } from '../../ui/popover/popover.service';
import { Observable } from 'rxjs';
import { IPopoverData } from '../../ui/popover/popover';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-get-auth',
  templateUrl: './dashboard-get-auth.component.html',
  styleUrls: ['./dashboard-get-auth.component.css']
})
export class DashboardGetAuthComponent implements OnInit {

  popoverState$: Observable<IPopoverData>;

  constructor(
    private popoverService: PopoverService,
    private router: Router
  ) { }

  ngOnInit() {
    this.popoverState$ = this.popoverService.popoverState$;
  }

  goToAuthPage() {
    this.router.navigate(['/auth/login']);
  }

  close() {
    this.popoverService.closePopover();
  }

}
