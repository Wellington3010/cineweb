import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

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
    this.userForm.reset();
  }

}
