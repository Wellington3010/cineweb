import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  cache: Map<string, string> = new Map();

  constructor(private http: HttpClient, private router: Router) { }

  public logarUsuario(email: string, senha: string) {

    // let params = new HttpParams();
    // params.set("email", email);
    // params.set("password", senha);
    let loginUsuario = "";
    console.log(email, senha);
    
    this.http.post<any>(endpoints.USER_LOGIN, { email: email, password: senha }).subscribe((resposta) => {
      loginUsuario = resposta as string;
      console.log(resposta);
      this.cache.set("loginUsuario", loginUsuario);
      this.router.navigate(['']);
    },(error) => {
      console.log(error);
    });
  }

  public deslogarUsuario(): string {

    return "";
  }

  public cadastrarUsuario(): string {

    return "";
  }

  public usuarioLogado(): boolean {

    return true
  }
}
