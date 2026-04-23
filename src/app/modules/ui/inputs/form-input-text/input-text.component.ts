/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, HostListener, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit, ControlValueAccessor {


  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type?: string;
  @Input() value?: string;
  @Input() id?: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() isValidator?: boolean;
  @Input() isUppercase?: boolean;
  @Input() maxiLength?: string;
  @Input() disabled?: boolean;


  isEdited: boolean = false;
  isActive: boolean = true;




  constructor(
    @Self() public controlDir: NgControl
  ) {
    controlDir.valueAccessor = this;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: Event) {
    if (this.input.nativeElement.contains(event.target) && this.isUppercase)
      this.input.nativeElement.setAttribute('style', 'text-transform: uppercase;');
  }

  is(o: any) {
    console.log(o);
  }

  ngOnInit() {
    const control = this.controlDir.control;
    if (control) {
      const validators = control.validator ? [control.validator] : [];
      control.setValidators(validators);
      const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];
      control.setAsyncValidators(asyncValidators);
      control.updateValueAndValidity();
      if (this.value === '' || this.value === null) {
        this.writeValue('');
      }

      if (this.value !== '' || this.value !== null) {
        control!.patchValue(this.value);
      }

      if (!this.maxiLength) {
        this.maxiLength = '300';
      }
    }


  }

  onChange(event: any) {
  }

  onTouched() {
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value  = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }


}
