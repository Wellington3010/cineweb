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

  constructor(private http: HttpClient, private router: Router) { }

  public logarUsuario(email: string, senha: string) {
    this.http.post(endpoints.USER_LOGIN, {
    email: email,
    password: senha 
    }).subscribe((data) => {

      let arrayResult = data.toString().split("_");
      this.cacheLogin.set("LoggedUser", `${arrayResult[2]}_${arrayResult[1]}`);
      alert("Login realizado com sucesso");
      this.router.navigate(['/']);

    }, (error) => {
      alert("Não foi possível realizar o login. Tente novamente");
      this.router.navigate(['/login']);
    });
  }

  public deslogarUsuario() {
    try {
      this.cacheLogin.clear();
      return true;

    } catch (error) {
      throw new Error("Não foi possivel realizar o logout" + error);
    }
  }

  public cadastrarUsuario(): string {

    return "";
  }

  public usuarioLogado(): string | undefined {
    return this.cacheLogin.get("LoggedUser")?.split("_")[0];
  }
}
