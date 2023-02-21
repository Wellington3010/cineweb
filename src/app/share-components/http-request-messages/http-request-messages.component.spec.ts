import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpRequestMessagesComponent } from './http-request-messages.component';

describe('HttpRequestMessagesComponent', () => {
  let component: HttpRequestMessagesComponent;
  let fixture: ComponentFixture<HttpRequestMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpRequestMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpRequestMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
