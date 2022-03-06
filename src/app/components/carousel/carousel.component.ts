import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  currentMovie!: number;
  lastMovie!: number;
  nextButtonOver!: boolean;
  previousButtonOver!: boolean;
  mobileNextButtonOver!: boolean;
  mobilePreviousButtonOver!: boolean;
  userSliderClickCounter: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.currentMovie = 1;
  }

  nextMovie() {
    switch(this.currentMovie) {
      case 1:
        this.currentMovie += 1;
        break;
      case 2:
        this.currentMovie += 1;
        break;
      case 3:
        this.currentMovie = 1
      break;
      default:
        this.currentMovie += 1;
      break;
    }
  }

  previousMovie() {
    switch(this.currentMovie) {
      case 3:
        this.currentMovie -= 1;
        break;
      case 2:
        this.currentMovie -= 1;
        break;
      case 1:
        this.currentMovie = 3
      break;
      default:
        this.currentMovie -= 1;
      break;
    }
  }

  nextSlide() {
    this.nextMovie();
    this.userSliderClickCounter += 1;

    if(this.userSliderClickCounter == 1) {
      setInterval(() => {
          this.nextMovie();
      }, 25000);
    }
  }

  previousSlide() {
    this.previousMovie();
    this.userSliderClickCounter += 1;

    if(this.userSliderClickCounter == 1) {
      setInterval(() => {
          this.previousMovie();
      }, 25000);
    }
  }
}
