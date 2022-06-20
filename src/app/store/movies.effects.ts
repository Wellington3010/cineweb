import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MoviesService } from '../services/movies.service';
 
@Injectable()
export class MovieEffects {
 
  homeMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Movies] Movies'),
    mergeMap(() => this.moviesService.getHomeMovies()
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
    mergeMap(() => this.moviesService.getCurrentMovies()
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
    mergeMap(() => this.moviesService.getComingSoonMovies()
      .pipe(
        map(movies => {
          return ({ type: '[ComingSoonMovies Movies] Movies Loaded with success', payload: movies });
        }),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}