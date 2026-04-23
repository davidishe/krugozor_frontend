/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandingProblemExplanationItemComponent } from './landing-problem-explanation-item.component';

describe('LandingProblemExplanationItemComponent', () => {
  let component: LandingProblemExplanationItemComponent;
  let fixture: ComponentFixture<LandingProblemExplanationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingProblemExplanationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingProblemExplanationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
