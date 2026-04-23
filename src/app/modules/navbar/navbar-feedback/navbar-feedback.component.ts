import { Component, OnInit } from '@angular/core';
import { PopoverService } from '../../ui/popover/popover.service';
import { PopoverTypes } from '../../ui/popover/popover-type';

@Component({
  selector: 'app-navbar-feedback',
  templateUrl: './navbar-feedback.component.html',
  styleUrls: ['./navbar-feedback.component.css']
})
export class NavbarFeedbackComponent implements OnInit {

  constructor(
    private popoverService: PopoverService
  ) { }

  ngOnInit(

  ) {
  }

  openPopoverFeedback() {
    let st = this.popoverService.getPopoverStatus();
    st.popoverType = PopoverTypes.feedback;
    st.status = true;
    st.blackWrapper = true;
    this.popoverService.setPopoverStatus(st);

  }


}
