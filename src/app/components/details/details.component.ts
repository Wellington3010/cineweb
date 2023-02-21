import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movie!: IMovie;
  naoExibirBotaoComprar!: boolean;
  carrinhoComQuantidadeMaxima!: boolean;
  @Input() movieTitle!: string;
  @Input() fromPage!: string;

  constructor(private effects: MovieEffects,
              private router: Router,
              private store: Store<{movies: IMovie[]}>,
              private cartService: CartService,
              private userManager: UserManagerService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.effects.cache.has(this.fromPage)) {
      var arrayMovies = this.effects.cache.get(this.fromPage);

      this.movie = arrayMovies?.find(x => x.titulo == this.movieTitle) as IMovie;
      this.naoExibirBotaoComprar = this.validarQuantidadeIngressos(this.movie.quantidadeIngressos);
      console.log(this.cartService.VerificaSeItemJaExisteNoCarrinho(this.movie));
      console.log(this.movie.quantidadeIngressos);
    }
    else {
      this.effects.findMovieByParameter$.subscribe((item) => this.movie = item.payload[0]);

      this.store.dispatch({type: '[FindMoviesByParameter] Movies', parameter: this.movieTitle, parameterType: "title" });
    }
  }

  validarQuantidadeIngressos(quantidadeIngressos: number): boolean {
    return (this.cartService.VerificaSeItemJaExisteNoCarrinho(this.movie) || (quantidadeIngressos == 0))
  }

  buyMovieTicket() {
    if(!this.userManager.hasLoggedUser()) {
      this.notificationService.warning("Cadastre-se e efetue o login para realizar a compra de ingressos");
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
      
      return;
    }


    this.carrinhoComQuantidadeMaxima = this.cartService.VerificaSeCarrinhoEstaComQuantidadeMaximaItens();

    if(this.carrinhoComQuantidadeMaxima) {
      alert("O número máximo de itens para o pedido é de 5. Finalize este pedido para realizar uma nova compra.");
      return;
    }

    this.cartService.AdicionarNoCarrinho(this.movie);
    alert("Item adicionado ao carrinho. Finalize seu pedido");
    this.router.navigate(['/cart']);
  }
}
