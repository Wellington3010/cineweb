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
    
    this.http.post(endpoints.USER_LOGIN, {
    email: email,
    password: senha 
    }).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log("Well");
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
