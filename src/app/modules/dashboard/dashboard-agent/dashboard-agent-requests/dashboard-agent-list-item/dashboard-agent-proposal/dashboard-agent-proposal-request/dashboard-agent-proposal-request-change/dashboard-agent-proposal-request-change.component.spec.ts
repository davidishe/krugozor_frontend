/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardAgentProposalRequestChangeComponent } from './dashboard-agent-proposal-request-change.component';

describe('DashboardAgentProposalRequestChangeComponent', () => {
  let component: DashboardAgentProposalRequestChangeComponent;
  let fixture: ComponentFixture<DashboardAgentProposalRequestChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAgentProposalRequestChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAgentProposalRequestChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
