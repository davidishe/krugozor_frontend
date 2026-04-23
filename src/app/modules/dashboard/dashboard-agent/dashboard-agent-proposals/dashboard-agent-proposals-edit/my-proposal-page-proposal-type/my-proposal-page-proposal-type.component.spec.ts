/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyProposalPageProposalTypeComponent } from './my-proposal-page-proposal-type.component';

describe('MyProposalPageProposalTypeComponent', () => {
  let component: MyProposalPageProposalTypeComponent;
  let fixture: ComponentFixture<MyProposalPageProposalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProposalPageProposalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProposalPageProposalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
