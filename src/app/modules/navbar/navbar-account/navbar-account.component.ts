import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PopoverService } from '../../ui/popover/popover.service';

@Component({
  selector: 'app-navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.scss']
})
export class NavbarAccountComponent implements OnInit, OnDestroy {


  constructor(
  ) { }

  ngOnInit() {
  }


  ngOnDestroy(): void {
  }



}
