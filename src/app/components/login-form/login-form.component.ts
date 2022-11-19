import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserManagerService } from '../../services/user-manager.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userForm!: FormGroup;
  @Input() page!: string;
  cpf!: string;

  constructor(private formBuilder: FormBuilder, private userManager: UserManagerService) { }


  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.userForm = this.formBuilder.group({
      nome:  [''],
      email: [''],
      cpf: [''],
      senha: [''],
    });
  }

  formatarCPF(event: Event) {
    if(this.userForm.value['cpf'] != null || this.userForm.value['cpf'] != undefined) {
      let cpf = (event.target as HTMLInputElement).value;

      let cpfAtualizado;

      cpfAtualizado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

      let validacaoCPF = this.validarCPF(cpfAtualizado);
      
      if(validacaoCPF == "") {
        this.userForm.controls["cpf"].setValue(cpfAtualizado); 
      }
       
      if(validacaoCPF != "") {
        this.userForm.controls["cpf"].setValue("");
        alert(validacaoCPF);
      }
    }
  }

  submitForm() {
    console.log(this.page);
    let nome = this.userForm.value['nome'].toString().trimStart();
    let email = this.userForm.value['email'].toString().trimStart();
    let cpf = this.userForm.value['cpf'].toString().trimStart();
    let senha = this.userForm.value['senha'];

    let validacaoNome = "";
    let validacaoEmail = this.validarEmail(email);
    let validacaoSenha = this.validarSenha(senha);
    let validacaoCPF = "";

    if(this.page == "Cadastro") {
      validacaoNome = this.validarNome(nome);
      validacaoCPF = this.validarCPF(cpf);
    }

    if(this.page != "Cadastro" && validacaoNome == "" && validacaoEmail == "" && validacaoSenha == "") {
      this.userManager.logarUsuario(email, senha);
      this.userForm.reset();
    }

    if(this.page == "Cadastro" && validacaoNome == "" && validacaoEmail == "" && validacaoSenha == "" && validacaoCPF == "") {
      this.userManager.cadastrarUsuario(nome, email, senha);
      this.userForm.reset();
    }

    if(validacaoNome != "") {
      alert(validacaoNome);
    }

    if(validacaoSenha != "") {
      alert(validacaoSenha);
    }

    if(validacaoEmail != "") {
      alert(validacaoEmail);
    }
  }


  validarNome(nome: string) : string {
    if(nome.trim().length == 0) {
      return "Campo nome deve ser preenchido";
    }

    if(nome.length > 40) {
      return "Campo nome não pode conter mais que 40 caracteres";
    }

    return "";
  }

  validarEmail(email: string) : string {
    if(email.trim().length == 0) {
      return "Campo email deve ser preenchido";
    }

    if(email.split("@").length != 2) {
      return "Email no formato inválido";
    }

    if(email.length > 70) {
      return "Campo email não pode conter mais que 70 caracteres";
    }

    return "";
  }

  validarSenha(senha: string) : string {
    if(senha.trim().length == 0) {
      return "Campo senha deve ser preenchido";
    }

    if(senha.length > 30) {
      return "Campo senha não pode conter mais que 30 caracteres";
    }

    return "";
  }

  validarCPF(cpf: string) : string {
    let regex = new RegExp(/(\d{3})(\d{3})(\d{3})(\d{2})/);

    if(!regex.test(cpf)) {
      return "No campo cpf só podem ser inseridos dígitos";
    }

    if(cpf.trim().length == 0) {
      return "Campo cpf deve ser preenchido";
    }

    if(cpf.length > 14) {
      return "Campo cpf não pode conter mais que 11 dígitos";
    }

    return "";
  }
}
