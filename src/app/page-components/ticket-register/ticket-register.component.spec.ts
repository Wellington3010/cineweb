import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRegisterComponent } from './ticket-register.component';

describe('TicketRegisterComponent', () => {
  let component: TicketRegisterComponent;
  let fixture: ComponentFixture<TicketRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
