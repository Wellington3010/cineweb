import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { IMovie } from '../interfaces/IMovie';
import { MoviesService } from '../services/movies.service';
import { findMoviesByParameter } from './store';
 
@Injectable()
export class MovieEffects {
  cache: Map<string, IMovie[]> = new Map();
 
  homeMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Movies] Movies'),
    mergeMap(() => this.homeMoviesWithCache()
      .pipe(
        map(movies => {
          return ({ type: '[Home Movies] Movies Loaded with success', payload: movies });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  currentMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[CurrentMovies Movies] Movies'),
    mergeMap(() => this.currentMoviesWithCache()
      .pipe(
        map(movies => {
          return ({ type: '[Current Movies] Movies Loaded with success', payload: movies });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  comingSoonMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[ComingSoonMovies Movies] Movies'),
    mergeMap(() => this.futureMoviesWithCache()
      .pipe(
        map(movies => {
          return ({ type: '[ComingSoonMovies Movies] Movies Loaded with success', payload: movies });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  allMoviesWithCache$ = createEffect(() => this.actions$.pipe(
    ofType('[AllMovies Movies With Cache] Movies'),
    mergeMap(() => this.allMoviesWithCache()
      .pipe(
        map(movies => {
          return ({ type: '[AllMovies Movies With Cache] Movies Loaded with success', payload: movies });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  allMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[AllMovies Movies] Movies'),
    mergeMap(() => this.allMovies()
      .pipe(
        map(movies => {
          return ({ type: '[AllMovies Movies] Movies Loaded with success', payload: movies });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  findMovieByParameter$ = createEffect(() => this.actions$.pipe(
    ofType(findMoviesByParameter),
    mergeMap((action) => this.findMoviesByParameter(action.parameter, action.parameterType, action.page)
    .pipe(
      map(movies => {
        return ({type: '[FindMoviesByParameter] Movies Loaded with sucess', payload: movies})
      }),
      catchError(() => EMPTY)
    ))
  ));

  homeMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("home-movies")) {
      return of(this.cache.get("home-movies")) as Observable<IMovie[]>;
    }
    else {
      this.moviesService.getHomeMovies().subscribe(item  => this.cache.set("home-movies", item));
      return this.moviesService.getHomeMovies();
    }
  }

  currentMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("current-movies")) {
      return of(this.cache.get("current-movies")) as Observable<IMovie[]>;
    }
    else {
      this.moviesService.getCurrentMovies().subscribe(item  => this.cache.set("current-movies", item));
      return this.moviesService.getCurrentMovies();
    }
  }

  futureMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("future-movies")) {
      return of(this.cache.get("future-movies")) as Observable<IMovie[]>;
    }
    else {
      this.moviesService.getComingSoonMovies().subscribe((item)  => this.cache.set("future-movies", item));
      return this.moviesService.getComingSoonMovies();
    }
  }

  allMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("admin-movies")) {
      return of(this.cache.get("admin-movies")) as Observable<IMovie[]>;
    }
    else {
      this.moviesService.getAllMovies().subscribe((item) => this.cache.set("admin-movies", item));
      return this.moviesService.getAllMovies();
    }
  }

  allMovies() : Observable<IMovie[]> {
    this.moviesService.getAllMovies().subscribe((item) => this.cache.set("admin-movies", item));
    return this.moviesService.getAllMovies();
  }

  findMoviesByParameter(parameter: string, parameterType: string, page: string) : Observable<IMovie[]> {
    var arrayMovies: IMovie[] = [];

    if(this.cache.has(page)) {
      if(parameterType == "title") {
        let moviesList = this.cache.get(page) as IMovie[];
        let movieSelected = moviesList?.filter(x => x.title.toLowerCase() == parameter.toLowerCase());
        return of(movieSelected) as Observable<IMovie[]>;
      }

      if(parameterType == "genre") {
        let moviesList = this.cache.get(page) as IMovie[];
        let movieSelected = moviesList?.filter(x => x.genre.toLowerCase() == parameter.toLowerCase());
        return of(movieSelected) as Observable<IMovie[]>;
      }

      if(parameterType == "date") {
        let moviesList = this.cache.get(page) as IMovie[];
        let movieSelected = moviesList?.filter(x => x.date == new Date(parameter));
        return of(movieSelected) as Observable<IMovie[]>;
      }
    }
    else {
      this.moviesService.getMoviesByParameter(parameter, parameterType).subscribe((item) => this.cache.set(parameter, item));
      return this.moviesService.getMoviesByParameter(parameter, parameterType);
    }

    return of(arrayMovies);
  }
 
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}