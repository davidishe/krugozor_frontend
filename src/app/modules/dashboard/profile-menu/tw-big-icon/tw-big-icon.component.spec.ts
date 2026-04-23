/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwBigIconComponent } from './tw-big-icon.component';

describe('TwBigIconComponent', () => {
  let component: TwBigIconComponent;
  let fixture: ComponentFixture<TwBigIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwBigIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwBigIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
