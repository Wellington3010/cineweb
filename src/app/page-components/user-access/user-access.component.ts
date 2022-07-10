import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
  currentPage!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentPage = this.router.url != "/login" ? "Cadastro" : "Login";
  }
}
