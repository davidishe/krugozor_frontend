/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NothingAddedComponent } from './nothing-added.component';

describe('NothingAddedComponent', () => {
  let component: NothingAddedComponent;
  let fixture: ComponentFixture<NothingAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NothingAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NothingAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
