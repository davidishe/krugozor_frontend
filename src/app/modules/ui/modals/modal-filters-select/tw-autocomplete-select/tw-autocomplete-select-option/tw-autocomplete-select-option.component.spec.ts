/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwAutocompleteSelectOptionComponent } from './tw-autocomplete-select-option.component';

describe('TwAutocompleteSelectOptionComponent', () => {
  let component: TwAutocompleteSelectOptionComponent;
  let fixture: ComponentFixture<TwAutocompleteSelectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwAutocompleteSelectOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwAutocompleteSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
