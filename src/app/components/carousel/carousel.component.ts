import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() currentPage!: string;
  currentMovie!: IMovie;
  nextButtonOver!: boolean;
  previousButtonOver!: boolean;
  mobileNextButtonOver!: boolean;
  mobilePreviousButtonOver!: boolean;
  homeMovies!: IMovie[];
  startMovie: number = 0;
  endMovie: number = 1;

  constructor(private store: Store<{movies: IMovie[]}>, private effect: MovieEffects) {
  }

  ngOnInit(): void {
    this.effect.homeMovies$.subscribe((item) => {
      this.homeMovies = item.payload;
      this.currentMovie = this.homeMovies[1];
    });

    this.store.dispatch({ type: '[Home Movies] Movies'});
  }

  nextClick() {
    if(this.endMovie < this.homeMovies.length) {
      this.startMovie++;
      this.endMovie++;
    }
  }

  previousClick() {
    if(this.startMovie > 0) {
      this.startMovie--;
      this.endMovie--;
    }
  }
}
