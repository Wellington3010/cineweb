import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getHomeMovies() {
    return this.http.get(endpoints.HOME_MOVIES);
  }

  getComingSoonMovies() {
    return this.http.get(endpoints.COMING_SOON_MOVIES);
  }

  getCurrentMovies() : Observable<any> {
    return this.http.get(endpoints.CURRENT_MOVIES);
  }

  getCurrentMoviesByDate(date: Date) {
    let params = new HttpParams().set('date', date.getDate());

    return this.http.get(endpoints.CURRENT_MOVIES_BY_DATE, {
      params: params
    });
  }

  getComingSoonMoviesByDate(date: Date) {
    let params = new HttpParams().set('date', date.getDate());

    return this.http.get(endpoints.COMMING_SOON_MOVIES_BY_DATE, {
      params: params
    });
  }

  getMoviesByParameter(parameter: string, parameterType: string) {
    let params = new HttpParams().set('parameter', parameter).set('parameterType', parameterType);

    return this.http.get(endpoints.MOVIES_BY_PARAMETER, {
      params: params
    });
  }
}
