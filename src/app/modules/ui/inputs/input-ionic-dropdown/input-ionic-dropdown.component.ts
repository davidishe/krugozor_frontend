import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { ICity } from 'src/app/models/main/city';
import { IFlightClass } from 'src/app/models/helpers/flight_classes';


/*
  version 1.0
*/

@Component({
  selector: 'app-input-ionic-dropdown',
  templateUrl: './input-ionic-dropdown.component.html',
  styleUrls: ['./input-ionic-dropdown.component.scss']
})
export class InputIonicDropdownComponent implements OnInit {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type?: string;
  @Input() control_name!: FormControl;
  @Input() form!: FormGroup;
  @Input() items:  IFlightClass[] = [];

  @Output() notify = new EventEmitter<any>();

  isItemAvailable: boolean = false;

  selected_items: any[] = [];
  

  @ViewChild('input_autocomplete') input_autocomplete: IonInput;

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isItemAvailable = false;
    }
  }


  ngOnInit() {
    this.selected_items = this.items;
  }

  handleItem(item: IFlightClass) {
    this.input_autocomplete.value = item.class_name;
    this.notify.emit( { data: item, control: this.control_name });
    this.isItemAvailable = false;
  }

  getItems(ev: any) {

    // Reset items back to all of the items
    this.isItemAvailable = true;
    // set val to the value of the searchbar
    const value = ev.target.value;

    this.selected_items = this.items;
      // if the value is an empty string don't filter the items
      if (value && value.trim() !== '') {
          this.selected_items = this.items.filter((item) => {
            return (item.class_name.toLowerCase().indexOf(value.toLowerCase()) > -1);
          });
      } 
      else {
          this.selected_items = this.items.filter((item) => {
            return (item.class_category.toLowerCase().indexOf(value.toLowerCase()) > -1);
          });
      }

        }

}
