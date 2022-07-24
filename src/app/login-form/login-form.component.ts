import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagerService } from '../services/user-manager.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userManager: UserManagerService) { }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.userForm = this.formBuilder.group({
      email: [''],
      senha: [''],
    });
  }

  submitForm() {
    let email = this.userForm.value['email'];
    let senha = this.userForm.value['senha'];

    var retorno = this.userManager.logarUsuario(email, senha);
    alert("Login realizado com sucesso");
    this.userForm.reset();
  }

}
