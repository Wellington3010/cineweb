import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheManagerService } from './cache-manager.service';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  public static cache: Map<string, string> = new Map();

  constructor(private http: HttpClient, private cacheService: CacheManagerService, private router: Router) { }

  public  logarUsuario(email: string, senha: string) {
    this.http.post(endpoints.USER_LOGIN, {
    email: email,
    password: senha 
    }).subscribe(async (data) => {

      let arrayResult = data.toString().split("_");
      
      this.cacheService
      .addToCache({ key: "loggedUser", value: `${arrayResult[2]}_${arrayResult[1]}`})
      .then((result) => {
        if(result) {
          alert("Login realizado com sucesso");
          this.router.navigate(['/']);
        }
      }).catch((error) => {
        alert("Não foi possível realizar o login. Tente novamente");
        console.log(error);
      });

    }, (error) => {
      alert("Não foi possível realizar o login. Tente novamente");
      this.router.navigate(['/login']);
    });
  }

  public deslogarUsuario(): boolean {
    let retorno: boolean = false;

    this.cacheService.clearCache({ key: "loggedUser" })
    .then((data) => {
      retorno = data;
    }).catch((error) => {
      alert("Não foi possível realizar o logout. Tente novamente");
      console.log(error);
    });

    return retorno;
  }

  public cadastrarUsuario(): string {

    return "";
  }

  public usuarioLogado(): boolean {

    return true
  }
}
