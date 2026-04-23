/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessengerChatHeaderActionsComponent } from './messenger-chat-header-actions.component';

describe('MessengerChatHeaderActionsComponent', () => {
  let component: MessengerChatHeaderActionsComponent;
  let fixture: ComponentFixture<MessengerChatHeaderActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerChatHeaderActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerChatHeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
