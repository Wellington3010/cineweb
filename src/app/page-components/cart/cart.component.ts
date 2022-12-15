import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { Pedido } from 'src/app/models/Pedido';
import { CartService } from 'src/app/services/cart.service';
import { MoviesService } from 'src/app/services/movies.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartMovies: IMovie[] = [];
  totalPedido: number = 0;
  titulos: string[] = [];


  constructor(
    private cartService: CartService,
    private userService: UserManagerService,
    private movieService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartMovies = this.cartService.RetornaItensDoCarrinho();
  }

  finalizarPedido() {
    this.cartMovies.forEach((item) => {
      this.totalPedido = this.totalPedido + item.preco;
      this.titulos.push(item.titulo);
    });

    console.log(this.totalPedido);

    let userName = this.userService.cacheLogin.get("LoggedUser")?.split("_")[0];
    let cpf = this.userService.cacheLogin.get("CpfLoggedUser")
    let pedido = new Pedido(this.totalPedido, cpf as string, userName as string, this.titulos);

    this.movieService.finalizarPedido(pedido)
    .pipe()
    .subscribe({
      next: () => this.onOrderSuccess("Pedido finalizado com sucesso"),
      error:(error) => console.log(error)
    });
  }

  onOrderSuccess(message: string) {
    alert(message);
    this.cartService.LimparCarrinho();
    this.router.navigate(['/em-breve']);
  }
}
