import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagerService } from '../../services/user-manager.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userForm!: FormGroup;
  @Input() page!: string;

  constructor(private formBuilder: FormBuilder, private userManager: UserManagerService) { }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.userForm = this.formBuilder.group({
      nome:  [''],
      email: [''],
      senha: [''],
    });
  }

  submitForm() {
    let nome = this.userForm.value['nome']
    let email = this.userForm.value['email'];
    let senha = this.userForm.value['senha'];

    if(this.page != "Cadastro")
      this.userManager.logarUsuario(email, senha);

    if(this.page == "Cadastro")
    this.userManager.cadastrarUsuario(nome, email, senha);

    this.userForm.reset();
  }

}
