import { Component, OnInit } from '@angular/core';
import { PopoverService } from 'src/app/modules/ui/popover/popover.service';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  constructor(
        public stateService: PopoverService
  ) { }

  ngOnInit() {
  }

}
