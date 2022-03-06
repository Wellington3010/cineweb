import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMoviesComponent } from './future-movies.component';

describe('FutureMoviesComponent', () => {
  let component: FutureMoviesComponent;
  let fixture: ComponentFixture<FutureMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
