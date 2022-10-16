import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserManagerService } from 'src/app/services/user-manager.service';
import { Router, RoutesRecognized } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {

  buttonOverOne!: boolean;
  buttonOverTwo!: boolean;
  buttonOverThree!: boolean;
  nameUserLogged: string = "none";

  constructor(private userManager: UserManagerService, private router: Router) { }

  ngOnInit(): void {
    this.buttonOverOne = false;
    this.buttonOverTwo = false;
    this.buttonOverThree = false;

    this.nameUserLogged = this.userManager.cacheLogin.has("LoggedUser") ? this.userManager.cacheLogin.get("LoggedUser") as string : "none";
  }

  logoutUser() {
    this.userManager.deslogarUsuario();
    alert("Logout realizado com sucesso");
    this.nameUserLogged = "none";
    location.reload();
  }
}
