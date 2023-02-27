import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';
import { CookieService } from './cookie.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  httpHeaders!: HttpHeaders;

  constructor(private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private notificationService: NotificationService) {
    }

  public logarUsuario(email: string, senha: string) {
    this.http.post(endpoints.USER_LOGIN, {
    email: email,
    senha: senha 
    }).subscribe((data) => {

      let arrayResult = data.toString().split("_");
      this.cookieService.setCookie("LoggedUser", `${arrayResult[2]}_${arrayResult[1]}`, 2);
      this.cookieService.setCookie("LoggedUserIsAdmin", arrayResult[3] == "True" ? "true" : "false", 2);
      this.cookieService.setCookie("token", btoa(arrayResult[4]), 2);

      let token = this.cookieService.getCookie("token");
      this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
      })

      this.http.post(endpoints.CLIENT_REGISTER, {
        NomeCliente: arrayResult[2],
        CPF: arrayResult[4]
      }, { headers: this.httpHeaders }).pipe()
      .subscribe({
        next: () => this.notificationService.success("Login realizado com sucesso"),
        error: () => this.notificationService.danger("Erro ao criar o cadastro do cliente")
      })

      if(this.loggedUserIsAdmin()) {
        this.router.navigate(['/movies-admin']);
      }
      else {
        this.router.navigate(['/']);
      }
    }, (error) => {
      this.notificationService.danger("Não foi possível realizar o login. Tente novamente");
      this.router.navigate(['/login']);
    });
  }

  public deslogarUsuario(): void {
    try {
      this.cookieService.deleteAllCookies();
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
        this.cookieService.setCookie("LoggedUser", `${arrayResult[2]}_${arrayResult[1]}`, 2);
        this.notificationService.success("Cadastro realizado com sucesso");
        this.router.navigate(['/']);
  
      }, (error) => {
        this.notificationService.danger("Não foi possível realizar o cadastro. Tente novamente");
        this.router.navigate(['/register']);
      });
  }

  public usuarioLogado(): string | undefined {
    return this.cookieService.getCookie("LoggedUser")?.split("_")[0];
  }

  public loggedUserIsAdmin() : boolean {
    let retorno = this.cookieService.getCookie("LoggedUserIsAdmin");
    return JSON.parse(retorno);
  }

  public hasLoggedUser() : boolean {
    return this.cookieService.getCookie("LoggedUser") != undefined;
  }
}
