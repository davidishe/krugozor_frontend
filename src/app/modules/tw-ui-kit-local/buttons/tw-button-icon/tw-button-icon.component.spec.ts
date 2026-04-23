/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwButtonIconComponent } from './tw-button-icon.component';

describe('TwButtonIconComponent', () => {
  let component: TwButtonIconComponent;
  let fixture: ComponentFixture<TwButtonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwButtonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
