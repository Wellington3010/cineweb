import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { Store } from '@ngrx/store';
import { MovieEffects } from 'src/app/store/movies.effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-carousel',
  templateUrl: './pages-carousel.component.html',
  styleUrls: ['./pages-carousel.component.scss']
})
export class PagesCarouselComponent implements OnInit {
  list!: IMovie[];
  @Input() currentPage!: string;
  pagesNextButtonOver: boolean = false;
  pagesPreviousButtonOver: boolean = false;
  startMovie: number = 0;
  endMovie: number = 3;
  currentWindow!: Window;
  moviesDetailsRoute!: string;

  constructor(private store: Store<{movies: IMovie[]}>, private effect: MovieEffects, private router: Router) { }

  ngOnInit(): void {
    this.listenerEffects();
    findMoviesByCurrentPage(this.currentPage, this.store);
    this.currentWindow = window;
    this.moviesDetailsRoute = this.currentPage == "movies-admin" ? '/edicao-de-filmes' : '/movie-details';
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

  setMoviesRangePerResolution() {
    this.endMovie = 3;
  }

  listenerEffects() {
    console.log(this.currentPage);
    switch(this.currentPage) {
      case "current-movies":
        this.effect.currentMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
        break;
      case "home-movies":
        this.effect.homeMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
        break;
      case "future-movies":
        this.effect.comingSoonMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
        break;
      case "movies-admin":
        this.effect.allMovies$.subscribe((item) => {
          this.list = item.payload;
          console.log(this.list);
          this.setMoviesRangePerResolution();
        });
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
        break;
      default:
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
        });
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
    case "movies-admin":
      findAllMovies(store);
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

function findAllMovies(store: Store<{movies: IMovie[]}>) {
  store.dispatch({ type: '[AllMovies Movies] Movies'});
}

