import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() page!: string;
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
