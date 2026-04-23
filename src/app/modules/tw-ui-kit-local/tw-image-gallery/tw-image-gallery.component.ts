import { Component, Input, OnInit } from '@angular/core';
import { PopoverService } from '../../ui/popover/popover.service';

@Component({
  selector: 'app-tw-image-gallery',
  templateUrl: './tw-image-gallery.component.html',
  styleUrls: ['./tw-image-gallery.component.scss']
})
export class TwImageGalleryComponent implements OnInit {

  @Input() image: any;
  @Input() imageUrl: string;
  currentIndex: number = 0;
  isExpanded: boolean = false;

  constructor(
    public popoverService: PopoverService
  ) { }

  ngOnInit() {
  }

  setCurrentPhotoToShow(index: number): void {
    this.currentIndex = index;
  }






  expand() {
    const popover = this.popoverService.getPopoverStatus();
    popover.blackWrapper = true;
    popover.isTotalBlack = true;
    popover.status = true;
    this.popoverService.setPopoverStatus(popover);
    this.isExpanded = true;
  }

  collapse() {
    this.isExpanded = false;
    this.popoverService.closePopover()
  }

}
