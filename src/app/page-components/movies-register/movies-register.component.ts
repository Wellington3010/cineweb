import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movies-register',
  templateUrl: './movies-register.component.html',
  styleUrls: ['./movies-register.component.scss']
})
export class MoviesRegisterComponent implements OnInit {
  urlImage: any = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onUpload(image: any) {
    this.urlImage = image;
  }

  resetPreview() {
    this.urlImage = undefined;
  }
}
