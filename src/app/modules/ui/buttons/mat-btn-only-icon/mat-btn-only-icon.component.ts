import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'btn-only-icon',
  templateUrl: './mat-btn-only-icon.component.html',
  styleUrls: ['./mat-btn-only-icon.component.scss']
})
export class MatBtnOnlyIconComponent {

  @Input() text!: string;
  @Input() icon?: string;
  @Input() type: string;
  @Input() svg?: string;
  @Input() bgcolor?: string;
  @Input() font?: string;
  @Input() isFlexWidth?: boolean;
  @Input() borderColor?: string;
  @Input() hover?: string;
  @Input() isPending?: boolean;
  @Input() disabled?: boolean;

  

  


  // @ViewChild('smallBtn', {static: false}) pRef!: ElementRef;

}
