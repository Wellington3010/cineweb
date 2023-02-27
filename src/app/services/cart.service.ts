import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cache: Map<string, IMovie[]> = new Map();
  moviesList: IMovie[] = [];

  constructor() {
    this.cache = new Map();
    this.cache.set("cart", this.moviesList);
  }

  
  public AdicionarNoCarrinho(movie: IMovie) : void {
    this.moviesList.push(movie);
    this.cache.set("cart", this.moviesList);
  }

  public RetornaItensDoCarrinho() : IMovie[] {
    return this.cache.get("cart") as IMovie[];
  }

  public LimparCarrinho() : void {
    this.cache = new Map();
    this.moviesList = [];
    this.cache.set("cart", this.moviesList);
  }

  public ItemNaoExisteNoCarrinho(movie: IMovie) : boolean {
    let listaDeFilmes = this.cache.get("cart") as IMovie[];

    if(listaDeFilmes == undefined)
      return true;

    let movieResult = listaDeFilmes.find(x => x.titulo == movie.titulo);

    if(movieResult != undefined || movieResult != null) {
      return false;
    }

    return true;
  }

  public VerificaSeCarrinhoEstaComQuantidadeMaximaItens() : boolean {
    let listaDeFilmes = this.cache.get("cart") as IMovie[];

    if(listaDeFilmes != undefined) {
      return listaDeFilmes.length >= 5;
    }

    return false;
  }
}
