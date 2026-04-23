/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BtnWithHintComponent } from './btn-with-hint.component';

describe('BtnWithHintComponent', () => {
  let component: BtnWithHintComponent;
  let fixture: ComponentFixture<BtnWithHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnWithHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnWithHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
