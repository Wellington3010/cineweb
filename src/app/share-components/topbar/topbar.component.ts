import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Router, RoutesRecognized } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { IMovie } from 'src/app/interfaces/IMovie';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  detailsMoviePage!: boolean;
  currentRouter!: string;
  topbarIconColor!: string;
  nameUserLogged: string = "none";
  loggedUserIsAdmin: boolean = false;
  carrinho: IMovie[] = [];

  constructor(
    private location: Location,
    private userManager: UserManagerService,
    private cartService: CartService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.carrinho = this.cartService.RetornaItensDoCarrinho();

    this.location.onUrlChange((url) => {
      this.currentRouter = this.location.path(false);
      this.detailsMoviePage = this.location.path(false).startsWith('/movie-details') || 
      this.location.path(false).startsWith('/login') ||
      this.location.path(false).startsWith('/register') ||
      this.location.path(false).startsWith('/cart')
    });

    this.router.events.subscribe((val) => {
      if(val instanceof RoutesRecognized) {
        let userNameArray = this.userManager.usuarioLogado()?.split(" ");
        this.nameUserLogged = userNameArray == undefined ? "none" : userNameArray[0];
        this.loggedUserIsAdmin = this.userManager.loggedUserIsAdmin();
      }
    });
  }

  logoutUser() {
    this.userManager.deslogarUsuario();
    this.notificationService.success("Logout realizado com sucesso");
    this.nameUserLogged = "none";
    this.loggedUserIsAdmin = false;
  }
}
