import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CacheManagerService } from './cache-manager.service';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  public cacheLogin: Map<string, string> = new Map();
  public cacheUserType: Map<string, boolean> = new Map();

  constructor(private http: HttpClient, private router: Router) { }

  public logarUsuario(email: string, senha: string) {
    this.http.post(endpoints.USER_LOGIN, {
    email: email,
    senha: senha 
    }).subscribe((data) => {

      let arrayResult = data.toString().split("_");
      this.cacheLogin.set("LoggedUser", `${arrayResult[2]}_${arrayResult[1]}`);
      this.cacheUserType.set("LoggedUserIsAdmin", arrayResult[3] == "True" ? true : false);
      alert("Login realizado com sucesso");

      if(this.loggedUserIsAdmin()) {
        this.router.navigate(['/movies-admin']);
      }
      else {
        this.router.navigate(['/']);
      }
    }, (error) => {
      alert("Não foi possível realizar o login. Tente novamente");
      this.router.navigate(['/login']);
    });
  }

  public deslogarUsuario(): void {
    try {
      this.cacheLogin.clear();
      this.cacheUserType.clear();
    } catch (error) {
      throw new Error("Não foi possivel realizar o logout" + error);
    }
  }

  public cadastrarUsuario(nome: string, email: string, senha: string, cpf: string) {

    this.http.post(endpoints.USER_REGISTER, {
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf
      }).subscribe((data) => {
  
        let arrayResult = data.toString().split("_");
        this.cacheLogin.set("LoggedUser", `${arrayResult[2]}_${arrayResult[1]}`);
        alert("Cadastro realizado com sucesso");
        this.router.navigate(['/']);
  
      }, (error) => {
        alert("Não foi possível realizar o cadastro. Tente novamente");
        this.router.navigate(['/register']);
      });
  }

  public usuarioLogado(): string | undefined {
    return this.cacheLogin.get("LoggedUser")?.split("_")[0];
  }

  public loggedUserIsAdmin() : boolean {
    return this.cacheUserType.get("LoggedUserIsAdmin") as boolean;
  }
}
