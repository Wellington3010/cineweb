import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cache: Map<string, IMovie[]> = new Map();
  moviesList: IMovie[] = [];

  constructor() {
    this.cache.set("cart", this.moviesList);
  }

  /**
   * name
   */
  public AdicionarNoCarrinho(movie: IMovie) : void {
    this.moviesList.push(movie);
    this.cache.set("cart", this.moviesList);
  }

  public RetornaItensDoCarrinho() : IMovie[] {
    return this.cache.get("cart") as IMovie[];
  }

  public LimparCarrinho() : void {
    this.cache.clear();
  }

  public VerificaSeItemJaExisteNoCarrinho(movie: IMovie) : boolean {
    let listaDeFilmes = this.cache.get("cart") as IMovie[];

    let movieResult = listaDeFilmes.find(x => x.title == movie.title);

    if(movieResult != undefined || movieResult != null) {
      return true;
    }

    return false;
  }

  public VerificaSeCarrinhoEstaComQuantidadeMaximaItens() : boolean {
    let listaDeFilmes = this.cache.get("cart") as IMovie[];

    return listaDeFilmes.length >= 5;
  }
}
