import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { Pedido } from 'src/app/models/Pedido';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'src/app/services/cookie.service';
import { MoviesService } from 'src/app/services/movies.service';
import { NotificationService } from 'src/app/services/notification.service';
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
    private notificationService: NotificationService,
    private cookieService: CookieService,
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

    let userName = this.cookieService.getCookie("LoggedUser")?.split("_")[0];
    let cpf = this.cookieService.getCookie("CpfLoggedUser")
    let pedido = new Pedido(this.totalPedido, cpf as string, userName as string, this.titulos);

    this.movieService.finalizarPedido(pedido)
    .pipe()
    .subscribe({
      next: () => this.onOrderSuccess("Pedido finalizado com sucesso"),
      error:() => this.notificationService.danger("Erro ao finalizar pedido")
    });
  }

  onOrderSuccess(message: string) {
    this.notificationService.success(message);
    this.cartService.LimparCarrinho();
    
    setTimeout(() => {
      this.router.navigate(['/em-breve']);
    }, 3000);
  }
}
