import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IMovie } from '../interfaces/IMovie';
import { MoviesService } from '../services/movies.service';
 
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

  homeMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("home-movies")) {
      console.log("Well from cache");
      return of(this.cache.get("home-movies")) as Observable<IMovie[]>;
    }
    else {
      console.log("Well from api");
      this.moviesService.getHomeMovies().subscribe(item  => this.cache.set("home-movies", item));
      return this.moviesService.getHomeMovies();
    }
  }

  currentMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("current-movies")) {
      console.log("current-movies from cache");
      return of(this.cache.get("current-movies")) as Observable<IMovie[]>;
    }
    else {
      console.log("current-movies from api");
      this.moviesService.getCurrentMovies().subscribe(item  => this.cache.set("current-movies", item));
      return this.moviesService.getCurrentMovies();
    }
  }

  futureMoviesWithCache() : Observable<IMovie[]> {
    if(this.cache.has("future-movies")) {
      console.log("future-movies from cache");
      return of(this.cache.get("future-movies")) as Observable<IMovie[]>;
    }
    else {
      console.log("future-movies from api");
      this.moviesService.getComingSoonMovies().subscribe(item  => this.cache.set("future-movies", item));
      return this.moviesService.getComingSoonMovies();
    }
  }
 
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}