import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { endpoints } from './endpoints';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { TicketRegister } from '../models/TicketRegister';
import { TicketDelete } from '../models/TicketDelete';

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

  public getAllMovies() : Observable<IMovie[]> {
    return this.http.get(endpoints.ALL_MOVIES) as Observable<IMovie[]>;
  }

  public getMoviesByParameter(parameter: string, parameterType: string) : Observable<IMovie[]> {
    let params = new HttpParams().set('parameter', parameter).set('parameterType', parameterType);

    return this.http.get(endpoints.MOVIES_BY_PARAMETER, {
      params: params
    }) as Observable<IMovie[]>;
  }

  public saveMovie(movie: IMovie) : Observable<boolean> {
    return this.http.post(endpoints.SAVE_MOVIE, {
      Titulo: movie.titulo,
      Data: movie.data,
      Genero: movie.genero,
      HomeMovie: movie.homeMovie,
      Poster: movie.poster,
      Active: movie.active,
      Sinopse: movie.sinopse
    }) as Observable<boolean>;
  }

  public updateMovie(movie: IMovie, oldTitle: string) : Observable<boolean> {
    return this.http.post(endpoints.UPDATE_MOVIE, {
      Titulo: movie.titulo,
      TituloAntigo: oldTitle,
      Data: movie.data,
      Genero: movie.genero,
      HomeMovie: movie.homeMovie,
      Poster: movie.poster,
      Active: movie.active,
      Sinopse: movie.sinopse
    }) as Observable<boolean>;
  }


  public deleteMovie(oldTitle: string) : Observable<boolean> {
      return this.http.post(endpoints.DELETE_MOVIE, {
        TituloAntigo: oldTitle
      }) as Observable<boolean>;
  }

  public cadastrarIngressos(ingresso: TicketRegister) {
    return this.http.post(endpoints.TICKET_REGISTER, ingresso);
  }

  public atualizarIngressos(ingresso: TicketRegister) {
    return this.http.post(endpoints.TICKET_UPDATE, ingresso);
  }

  public deletarIngressos(ingresso: TicketDelete) {
    return this.http.post(endpoints.TICKET_DELETE, ingresso);
  }
}
