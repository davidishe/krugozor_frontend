/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormContactsComponent } from './form-contacts.component';

describe('FormContactsComponent', () => {
  let component: FormContactsComponent;
  let fixture: ComponentFixture<FormContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
