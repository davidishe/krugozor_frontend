/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RangeBuildingDateComponent } from './range-building-date.component';

describe('RangeBuildingDateComponent', () => {
  let component: RangeBuildingDateComponent;
  let fixture: ComponentFixture<RangeBuildingDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeBuildingDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeBuildingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
