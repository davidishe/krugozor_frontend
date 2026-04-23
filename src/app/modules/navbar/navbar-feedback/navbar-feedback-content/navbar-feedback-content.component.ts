import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPopoverData } from 'src/app/modules/ui/popover/popover';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';

@Component({
  selector: 'app-navbar-feedback-content',
  templateUrl: './navbar-feedback-content.component.html',
  styleUrls: ['./navbar-feedback-content.component.css']
})
export class NavbarFeedbackContentComponent implements OnInit {
  popoverState$: Observable<IPopoverData>;

  constructor(
    private popoverService: PopoverService,
  ) { }

  ngOnInit() {
    this.popoverState$ = this.popoverService.popoverState$;
  }

  close() {
    this.popoverService.closePopover();
  }
}
