import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Router, RoutesRecognized } from '@angular/router';

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

  constructor(private location: Location, private userManager: UserManagerService, private router: Router) {
  }

  ngOnInit(): void {
    this.location.onUrlChange((url) => {
      this.currentRouter = this.location.path(false);
      this.detailsMoviePage = this.location.path(false).startsWith('/movie-details') || 
      this.location.path(false).startsWith('/login') ||
      this.location.path(false).startsWith('/register')
    });

    this.router.events.subscribe((val) => {
      if(val instanceof RoutesRecognized) {

        if((val as RoutesRecognized).url == "/" || (val as RoutesRecognized).url == "/movies-admin") {
          let userNameArray = this.userManager.usuarioLogado()?.split(" ");
          this.nameUserLogged = userNameArray == undefined ? "none" : userNameArray[0];
          this.loggedUserIsAdmin = this.userManager.loggedUserIsAdmin();
        }
      }
    });
  }

  logoutUser() {
    this.userManager.deslogarUsuario();
    alert("Logout realizado com sucesso");
    this.nameUserLogged = "none";
    this.loggedUserIsAdmin = false;
  }
}
