/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShadersComponent } from './shaders.component';

describe('ShadersComponent', () => {
  let component: ShadersComponent;
  let fixture: ComponentFixture<ShadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
