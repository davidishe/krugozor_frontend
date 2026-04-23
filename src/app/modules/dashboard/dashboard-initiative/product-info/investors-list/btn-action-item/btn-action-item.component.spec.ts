/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BtnActionItemComponent } from './btn-action-item.component';

describe('BtnActionItemComponent', () => {
  let component: BtnActionItemComponent;
  let fixture: ComponentFixture<BtnActionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnActionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
