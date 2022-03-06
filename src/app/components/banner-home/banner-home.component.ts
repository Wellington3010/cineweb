import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  styleUrls: ['./banner-home.component.scss']
})
export class BannerHomeComponent implements OnInit {

  currentMovie!: number;
  lastMovie!: number;

  constructor() { 
  }

  ngOnInit(): void {
    this.currentMovie = 1;
    this.lastMovie = 3;
  }

  nextMovie() {
    if(this.currentMovie < 3) {
      this.currentMovie += 1;
    }
    else {
      this.currentMovie -= 2;
    }
  }
}
