import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionModel } from '../../../models';

enum Action {
  note = 'note',
  link = 'link',
  file = 'file',
  folder = 'folder',
  trash = 'trash',
}


@Component({
  selector: 'app-map-element',
  templateUrl: './map-element.component.html',
  styleUrls: ['./map-element.component.scss'],
})
export class MapElementComponent {
  

  apiLoaded!: Observable<boolean>;
  zoom = 4;

  @Input() text?: string;
  @Input() iconPath?: string;
  @Input() isDisabled?: boolean;
  @Input() fontWeight?: string;
  @Input() iconPathRight?: string;
  @Input() backLink?: string[];
  @Input() routeLink?: string[];

  @Input() genericArtifact?: any;
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() markerName!: string;
  @Input() options: OptionModel[] = [];


  isPopoverVisible = false;
  


  constructor(
    private elementRef: ElementRef,
  ) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPopoverVisible = false;
    } 
    
    if (event.target.id === 'layer') {
      this.isPopoverVisible = false;
    }
  }


  handleClick(value: Action) {
    this.isPopoverVisible = false;
    console.log(value);
    if (value === 'trash') {
      this.delete();
    }
    
  }


  delete(): void {
    console.log(this.genericArtifact);
  }




  ngAfterViewInit(): void {
  }






}
