/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwIconComponent } from './tw-icon.component';

describe('TwIconComponent', () => {
  let component: TwIconComponent;
  let fixture: ComponentFixture<TwIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
