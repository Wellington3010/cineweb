import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() currentPage!: string;
  currentMovie!: number;
  lastMovie!: number;
  nextButtonOver!: boolean;
  previousButtonOver!: boolean;
  mobileNextButtonOver!: boolean;
  mobilePreviousButtonOver!: boolean;
  userSliderClickCounter: number = 0;
  images!: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.currentMovie = 1;
    this.images = [
      {
        groupName: 'group1',
        imagesGroup: [
          {path: 'assets/images/movie1.jpg'},
          {path: 'assets/images/movie2.jpg'},
          {path: 'assets/images/movie3.jpg'},
          {path: 'assets/images/movie4.jpg'},
          {path: 'assets/images/movie4.jpg'},
          {path: 'assets/images/movie5.jpg'},
        ],
        visible: true
      },
      {
        groupName: 'group2',
        imagesGroup: [
          {path: 'assets/images/movie6.jpg'},
          {path: 'assets/images/movie7.jpg'},
          {path: 'assets/images/movie8.jpg'},
          {path: 'assets/images/movie9.jpg'},
          {path: 'assets/images/movie9.jpg'},
          {path: 'assets/images/movie10.jpg'}
        ],
        visible: false
      }
    ]
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
      }, 15000);
    }
  }

  previousSlide() {
    this.previousMovie();
    this.userSliderClickCounter += 1;

    if(this.userSliderClickCounter == 1) {
      setInterval(() => {
          this.previousMovie();
      }, 15000);
    }
  }

  nextGroupMovie() {
    this.images.forEach((item) => {
      item.visible = !item.visible;
    });

    setInterval(() => {
      this.images.forEach((item) => {
        item.visible = !item.visible;
      });
    }, 20000);
  }
}
