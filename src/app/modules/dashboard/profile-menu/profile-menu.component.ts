import { Component, OnInit } from '@angular/core';
import { PopoverService } from '../../ui/popover/popover.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor(
    private popoverService: PopoverService
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.popoverService.closePopover();
  }

}
