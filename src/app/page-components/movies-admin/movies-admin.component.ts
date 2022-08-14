import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';

@Component({
  selector: 'app-movies-admin',
  templateUrl: './movies-admin.component.html',
  styleUrls: ['./movies-admin.component.scss']
})
export class MoviesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
