import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserManagerService } from 'src/app/services/user-manager.service';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  detailsMoviePage!: boolean;
  currentRouter!: string;
  topbarIconColor!: string;
  nameUserLogged!: string | undefined;

  constructor(private location: Location, private userManager: UserManagerService, private router: Router) {
  }

  ngOnInit(): void {
    this.location.onUrlChange((url) => {
      this.currentRouter = this.location.path(false);
      this.detailsMoviePage = this.location.path(false).startsWith('/movie-details') || this.location.path(false).startsWith('/login');
    });

    this.router.events.subscribe((val) => {
      if(val instanceof RoutesRecognized) {

        if((val as RoutesRecognized).url == "/") {
          this.nameUserLogged = this.userManager.usuarioLogado(); 
        }
      }
    });
  }

  logoutUser() {
    this.userManager.deslogarUsuario();
    alert("Logout realizado com sucesso");
    this.nameUserLogged = undefined;
  }
}
