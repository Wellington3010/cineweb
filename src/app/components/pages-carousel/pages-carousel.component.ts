import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { Store } from '@ngrx/store';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-pages-carousel',
  templateUrl: './pages-carousel.component.html',
  styleUrls: ['./pages-carousel.component.scss']
})
export class PagesCarouselComponent implements OnInit {
  list: IMovie[] = [];
  @Input() currentPage!: string;
  pagesNextButtonOver: boolean = false;
  pagesPreviousButtonOver: boolean = false;
  startMovie: number = 0;
  endMovie: number = 3;

  constructor(private store: Store<{movies: IMovie[]}>, private effect: MovieEffects) { }

  ngOnInit(): void {
    this.listenerEffects();
    findMoviesByCurrentPage(this.currentPage, this.store);
  }


  nextMovie(): void {
      if(this.endMovie < this.list.length) {
        this.startMovie++;
        this.endMovie++;
      }

    return;
  }

  previousMovie() {
      if(this.startMovie != (this.list.length - this.list.length)) {
        this.startMovie--;
        this.endMovie--;
      }

    return;
  }

  listenerEffects() {
    switch(this.currentPage) {
      case "current-movies":
        this.effect.currentMovies$.subscribe((item) => this.list = item.payload);
        this.effect.findMovieByParameter$.subscribe((item) => this.list = item.payload);
        break;
      case "home-movies":
        this.effect.homeMovies$.subscribe((item) => this.list = item.payload);
        break;
      case "future-movies":
        this.effect.comingSoonMovies$.subscribe((item) => this.list = item.payload);
        this.effect.findMovieByParameter$.subscribe((item) => this.list = item.payload);
        break;
      default:
        this.effect.findMovieByParameter$.subscribe((item) => this.list = item.payload);
        break;
    }
  }
}

function findMoviesByCurrentPage(page: string, store: Store<{movies: IMovie[]}>) {
  switch(page) {
    case "current-movies":
      findCurrentMovies(store);
      break;
    case "home-movies":
      findHomeMovies(store);
      break;
    case "future-movies":
      findComingSoonMovies(store);
      break;
    default:
      findCurrentMovies(store);
      break;
  }
}

function findCurrentMovies(store: Store<{movies: IMovie[]}>) {
  store.dispatch({ type: '[CurrentMovies Movies] Movies'});
}

function findHomeMovies(store: Store<{movies: IMovie[]}>) {
  store.dispatch({ type: '[HomeMovies Movies] Movies'});
}

function findComingSoonMovies(store: Store<{movies: IMovie[]}>) {
  store.dispatch({ type: '[ComingSoonMovies Movies] Movies'});
}

