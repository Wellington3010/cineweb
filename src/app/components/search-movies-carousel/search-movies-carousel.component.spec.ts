import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMoviesCarouselComponent } from './search-movies-carousel.component';

describe('SearchMoviesCarouselComponent', () => {
  let component: SearchMoviesCarouselComponent;
  let fixture: ComponentFixture<SearchMoviesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMoviesCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMoviesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
