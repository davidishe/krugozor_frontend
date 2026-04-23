import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-sorting-button',
  templateUrl: './sorting-button.component.html',
  styleUrls: ['./sorting-button.component.scss']
})
export class SortingButtonComponent implements OnInit {

  @Input() icon: string;
  delay: boolean = false;
  isOpen: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private proposalService: ProposalsService
  ) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    if (!this.elementRef.nativeElement.contains(event.target))
      this.isOpen = false;
  }

  ngOnInit() {
  }

  sortAccending() {
    const params = this.proposalService.getQueryParams();
    params.isAscending = true;
    params.isDescending = false;
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
    this.isOpen = false;
  }

  sortDescending() {
    const params = this.proposalService.getQueryParams();
    params.isAscending = false;
    params.isDescending = true;
    this.proposalService.setQueryParams(params);
    this.proposalService.getAllDataWithGQL();
    this.isOpen = false;
  }

  toggleButton() {
    this.isOpen = !this.isOpen;
  }

}
