import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-btn-small-second',
  templateUrl: './mat-btn-small-second.component.html',
  styleUrls: ['./mat-btn-small-second.component.scss']
})
export class MatBtnSmallSecondComponent {

  @Input() text!: string;
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() type: string;
  @Input() svg?: string;
  @Input() bgcolor?: string;
  @Input() font?: string;
  @Input() isFlexWidth?: boolean;
  @Input() borderColor?: string;
  @Input() hover?: string;


  // @ViewChild('smallBtn', {static: false}) pRef!: ElementRef;

}
