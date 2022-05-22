import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MoviesServiceService } from 'src/app/services/movies-service.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() currentPage!: string;
  currentMovie!: IMovie;
  nextButtonOver!: boolean;
  previousButtonOver!: boolean;
  mobileNextButtonOver!: boolean;
  mobilePreviousButtonOver!: boolean;
  userSliderClickCounter: number = 0;
  arrayMovies: any[] = [];
  homeMovies!: IMovie[];
  currentMovieIndex: number = 1;

  constructor(private moviesService: MoviesServiceService) {
  }


  ngOnInit(): void {
      let _ = this.moviesService.getHomeMovies().subscribe((item) => {
        this.homeMovies = item as IMovie[];
        this.currentMovie = this.homeMovies[1];
      }, (err) => {
        console.log(err);
      });
  }

  nextSlide() {
    this.currentMovieIndex = this.homeMovies.findIndex(x => x.title.trim() == this.currentMovie.title.trim());
    if(this.currentMovieIndex == (this.homeMovies.length - 1)) {
      this.currentMovieIndex = (this.homeMovies.length - this.homeMovies.length);
    }
    else {
      this.currentMovieIndex = this.currentMovieIndex + 1; 
    }
    this.currentMovie = this.homeMovies[this.currentMovieIndex];
    this.userSliderClickCounter += 1;
  }

  nextClick() {
    this.nextSlide();

     if(this.userSliderClickCounter == 1) {
      setInterval(() => {
          this.nextSlide();
      }, 20000);
    }
  }

  previousSlide() {
    this.currentMovieIndex = this.homeMovies.findIndex(x => x.title == this.currentMovie.title);
    if(this.currentMovieIndex == 0) {
      this.currentMovieIndex = (this.homeMovies.length - 1);
    }
    else {
      this.currentMovieIndex = this.currentMovieIndex - 1;
    }

    this.currentMovie = this.homeMovies[this.currentMovieIndex];
    this.userSliderClickCounter += 1;
  }

  previousClick() {
    this.previousSlide();

     if(this.userSliderClickCounter == 1) {
      setInterval(() => {
          this.previousSlide();
      }, 20000);
    }
  }
}
