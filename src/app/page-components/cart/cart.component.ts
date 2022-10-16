import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartMovies: IMovie[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartMovies = this.cartService.RetornaItensDoCarrinho();
    console.log(this.cartMovies);
  }
}
