import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { CartService } from 'src/app/services/cart.service';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movie!: IMovie;
  naoExiberBotaoComprar!: boolean;
  carrinhoComQuantidadeMaxima!: boolean;
  @Input() movieTitle!: string;
  @Input() fromPage!: string;

  constructor(private effects: MovieEffects,
              private router: Router,
              private store: Store<{movies: IMovie[]}>,
              private cartService: CartService) { }

  ngOnInit(): void {
    if(this.effects.cache.has(this.fromPage)) {
      var arrayMovies = this.effects.cache.get(this.fromPage);

      this.movie = arrayMovies?.find(x => x.title == this.movieTitle) as IMovie;

      this.naoExiberBotaoComprar = this.cartService.VerificaSeItemJaExisteNoCarrinho(this.movie);
    }
    else {
      this.effects.findMovieByParameter$.subscribe((item) => this.movie = item.payload[0]);

      this.store.dispatch({type: '[FindMoviesByParameter] Movies', parameter: this.movieTitle, parameterType: "title" });
    }
  }

  buyMovieTicket() {
    this.carrinhoComQuantidadeMaxima = this.cartService.VerificaSeCarrinhoEstaComQuantidadeMaximaItens();

    if(this.carrinhoComQuantidadeMaxima) {
      alert("O número máximo de itens para o pedido é de 5. Finalize este pedido para realizar uma nova compra.");
      return;
    }

    this.cartService.AdicionarNoCarrinho(this.movie);
    this.router.navigate(['/cart']);
  }
}
