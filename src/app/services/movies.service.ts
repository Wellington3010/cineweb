import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endpoints } from './endpoints';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { 
  }

  public getHomeMovies() : Observable<IMovie[]> {
    return this.http.get(endpoints.HOME_MOVIES) as Observable<Array<IMovie>>;
  }

  public getComingSoonMovies() : Observable<Array<IMovie>> {
    return this.http.get(endpoints.COMING_SOON_MOVIES) as Observable<Array<IMovie>>;
  }

  public getCurrentMovies() : Observable<IMovie[]> {
    return this.http.get(endpoints.CURRENT_MOVIES) as Observable<Array<IMovie>>;
  }

  public getCurrentMoviesByDate(date: Date) : Observable<IMovie[]> {
    let params = new HttpParams().set('date', date.getDate());

    return this.http.get(endpoints.CURRENT_MOVIES_BY_DATE, {
      params: params
    }) as Observable<IMovie[]>;
  }

  public getComingSoonMoviesByDate(date: Date) : Observable<IMovie[]> {
    let params = new HttpParams().set('date', date.getDate());

    return this.http.get(endpoints.COMMING_SOON_MOVIES_BY_DATE, {
      params: params
    }) as Observable<IMovie[]>;
  }

  public getMoviesByParameter(parameter: string, parameterType: string) : Observable<IMovie[]> {
    let params = new HttpParams().set('parameter', parameter).set('parameterType', parameterType);

    return this.http.get(endpoints.MOVIES_BY_PARAMETER, {
      params: params
    }) as Observable<IMovie[]>;
  }
}
