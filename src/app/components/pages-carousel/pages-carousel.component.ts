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
  list: IMovie[] = [];
  @Input() currentPage!: string;
  pagesNextButtonOver: boolean = false;
  pagesPreviousButtonOver: boolean = false;
  startMovie: number = 0;
  endMovie: number = 3;
  currentWindow!: Window;

  constructor(private store: Store<{movies: IMovie[]}>, private effect: MovieEffects, private router: Router) { }

  ngOnInit(): void {
    this.listenerEffects();
    findMoviesByCurrentPage(this.currentPage, this.store);
    this.currentWindow = window;
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
    if(this.currentWindow.innerWidth < 1024) {
      this.endMovie = this.list.length;
    }
    else {
      this.endMovie = 3;
    }
  }

  listenerEffects() {
    switch(this.currentPage) {
      case "current-movies":
        this.effect.currentMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        break;
      case "home-movies":
        this.effect.homeMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        break;
      case "future-movies":
        this.effect.comingSoonMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        break;
      case "admin-movies":
        this.effect.allMovies$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
        });
        break;
      default:
        this.effect.findMovieByParameter$.subscribe((item) => {
          this.list = item.payload;
          this.setMoviesRangePerResolution();
          if(this.list.length == 0)
            this.router.navigate(['**']);
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
    case "admin-movies":
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

