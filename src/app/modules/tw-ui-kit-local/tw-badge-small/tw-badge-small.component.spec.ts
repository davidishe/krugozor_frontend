/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwBadgeSmallComponent } from './tw-badge-small.component';

describe('TwBadgeSmallComponent', () => {
  let component: TwBadgeSmallComponent;
  let fixture: ComponentFixture<TwBadgeSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwBadgeSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwBadgeSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
