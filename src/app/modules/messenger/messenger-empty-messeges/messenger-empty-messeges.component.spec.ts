/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessengerEmptyMessegesComponent } from './messenger-empty-messeges.component';

describe('MessengerEmptyMessegesComponent', () => {
  let component: MessengerEmptyMessegesComponent;
  let fixture: ComponentFixture<MessengerEmptyMessegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerEmptyMessegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerEmptyMessegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
