import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCarouselComponent } from './pages-carousel.component';

describe('PagesCarouselComponent', () => {
  let component: PagesCarouselComponent;
  let fixture: ComponentFixture<PagesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
