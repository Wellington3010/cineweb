import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMovie } from '../interfaces/IMovie';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor(private http: HttpClient) { }

  getHomeMovies() {
    return this.http.get(`https://cineweb-movies-api-app.herokuapp.com/movies/home`);
  }

  getComingSoonMovies() {
    return this.http.get(`https://cineweb-movies-api-app.herokuapp.com/movies/coming-soon`);
  }

  getCurrentMovies() : Observable<any> {
    return this.http.get("https://cineweb-movies-api-app.herokuapp.com/movies/current");
  }

  getCurrentMoviesByDate(date: Date) {
    let params = new HttpParams().set('date', date.getDate());

    return this.http.get(`https://cineweb-movies-api-app.herokuapp.com/movies/current/by-date`, {
      params: params
    });
  }

  getComingSoonMoviesByDate(date: Date) {
    let params = new HttpParams().set('date', date.getDate());

    return this.http.get(`https://cineweb-movies-api-app.herokuapp.com/movies/coming-soon/by-date`, {
      params: params
    });
  }

  getMoviesByParameter(parameter: string, parameterType: string) {
    let params = new HttpParams().set('parameter', parameter).set('parameterType', parameterType);

    return this.http.get(`https://cineweb-movies-api-app.herokuapp.com/movies/by-parameter`, {
      params: params
    });
  }
}
