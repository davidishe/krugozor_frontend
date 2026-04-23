import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IStrapiData, IStrapiProposalAttributes } from 'src/app/models/main/proposal';

@Component({
  selector: 'app-input-range-select',
  templateUrl: './input-range-select.component.html',
  styleUrls: ['./input-range-select.component.scss']
})
export class InputRangeSelectComponent implements OnInit, AfterViewChecked {

  rangeVar!: string;
  selectedShare: number = 0;
  @Input() isAvailbale: boolean = true;
  isPending: boolean = false;
  isUpdateMode: boolean = false;

  orders: any[] = [];


  values: any[] = [];

  @Input() proposal!: IStrapiData;
  form!: FormGroup;

  constructor(
    // private ordersService: OrdersService,
    // private alertService: TwAlertService
    // private cdr: ChangeDetectorRef
  ) { }


  
  ngOnInit() {
    this.getOrderStatus();
    this.createForm();
    // this.getAllInvestors();
    this.values = [
      {rangeValue: 23, range: 1},
      {rangeValue: 33, range: 2},
      {rangeValue: 39, range: 3},
      {rangeValue: 46, range: 4},
      {rangeValue: 51, range: 5},
      {rangeValue: 60, range: 5},
      {rangeValue: 65, range: 5},
      {rangeValue: 79, range: 5},
      {rangeValue: 90, range: 5},
      {rangeValue: 100, range: 5},
      {rangeValue: 110, range: 5},
      {rangeValue: 100, range: 5},
      {rangeValue: 90, range: 5},
      {rangeValue: 88, range: 5},
      {rangeValue: 75, range: 5},
      {rangeValue: 60, range: 5},
      {rangeValue: 40, range: 5},
      {rangeValue: 30, range: 5},
      {rangeValue: 20, range: 5},
      {rangeValue: 19, range: 5},
      {rangeValue: 20, range: 5},
      {rangeValue: 31, range: 5},
      {rangeValue: 35, range: 5},
      {rangeValue: 39, range: 5},
      {rangeValue: 42, range: 5},
      {rangeValue: 46, range: 6},
      {rangeValue: 51, range: 7},
      {rangeValue: 50, range: 8},
      {rangeValue: 56, range: 9}
    ];

  }
  


  createForm() {
    this.form = new FormGroup({
        shareValue: new FormControl(0, [Validators.required, Validators.min(20)]),
      });

      
  }


  changeRange(value: string, ref: HTMLInputElement) {
    ref.value = value;
    this.selectedShare = +value;

  }

  onIncrease(ref: HTMLInputElement, realRef: HTMLInputElement) {

    if((+ref.value + 20) > 100)
        return;

    ref.value = (+ref.value + 20).toString();
    realRef.value = ref.value;
    this.selectedShare = +ref.value;
  }


  getOrderStatus() {
    // this.ordersService.getOrderStatus(this.proposal.id).subscribe((res: any) => {
    //   if (res) {
    //     
    //     this.isAvailbale = false;
    //   }
    // }, (er: any) => {
    //   if (er.status === 404) {
    //     this.isAvailbale = true;
    //   }
    // })

  }


  onDecrease(ref: HTMLInputElement, realRef: HTMLInputElement) {
    if((+ref.value - 20) < 20)
        return;
    ref.value = (+ref.value - 20).toString();
    realRef.value = ref.value;
    this.selectedShare = +ref.value;
  }


  getCurrentPledgedRate(): number {
    let currentPledgedRate = 0;
    this.orders.forEach(element => {
      currentPledgedRate = currentPledgedRate + element.shareValue;
    });
    return (100 - currentPledgedRate);
  }


  createOrder() {


    this.isPending = true;

    if(!this.form.valid)
      return false;

      const orderDto: any = {
        tourType: +this.form.get('tourType')!.value,
        shareValue: +this.form.get('shareValue')!.value,
        proposalId: +this.proposal.id
      };

      console.log(orderDto);
  } 


  editMode() {
    this.isAvailbale = true;
    this.isUpdateMode = true;
  }


  // onUpdateMode() {
  // }

    
    ngAfterViewChecked(): void {
      //Called after every check of the component's view. Applies to components only.
      //Add 'implements AfterViewChecked' to the class.
      // this.cdr.detectChanges();
    }

}








