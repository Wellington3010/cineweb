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
  lastMovie!: number;
  nextButtonOver!: boolean;
  previousButtonOver!: boolean;
  mobileNextButtonOver!: boolean;
  mobilePreviousButtonOver!: boolean;
  userSliderClickCounter: number = 0;
  arrayMovies: any[] = []; 
  homeMovies!: IMovie[];
  pageMovies!: IMovie[];
  observableMovies!: any;
  currentMovieIndex: number = 1;

  constructor(private moviesService: MoviesServiceService) {
  }


  ngOnInit(): void {
    
    if(this.homeMovies == null || this.pageMovies == null) {

      switch(this.currentPage) {
        case "home":
          this.observableMovies = this.moviesService
            .getHomeMovies().subscribe((item) => {
              this.homeMovies = item as IMovie[];
              this.currentMovie = this.homeMovies[1];
            }, (err) => {
              console.log(err);
            });
          break;
        case "future-movies":
          this.observableMovies = this.moviesService
            .getComingSoonMovies().subscribe((item) => {
              this.pageMovies = item as IMovie[];
              this.fillPageMovies();
              console.log(this.arrayMovies);
            }, (err) => {
              console.log(err);
            });
          break;
        default:
          this.observableMovies = this.moviesService
          .getCurrentMovies().subscribe((item) => {
            this.pageMovies = item as IMovie[];
            this.fillPageMovies();
          }, (err) => {
            console.log(err);
          });
          break;
      }
    }
  }

  fillPageMovies() {
    let countGroup = 1;
    let countMovies = 1;
    let groupItem: any = { 
      groupName: "group" + countGroup,
      movies: [] as IMovie[],
      visible: true 
    };

    if(this.pageMovies != undefined) {
      this.pageMovies.forEach((x) => {
          if(groupItem.movies.length < 5 || groupItem.movies == undefined) {
            groupItem.movies.push(x);
            countMovies = countMovies + 1;
          }
          else {
            this.arrayMovies.push(groupItem);
            countGroup++;
            countMovies = 1;
            groupItem = {
              groupName: "group" + countGroup,
              movies: [] as IMovie[],
              visible: false 
            };
          }
      });
    }
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

  nextGroupMovie() {
    if(this.arrayMovies.length > 1) {
      this.arrayMovies.forEach((item) => {
        item.visible = !item.visible;
      });
  
      setInterval(() => {
        this.arrayMovies.forEach((item) => {
          item.visible = !item.visible;
        });
      }, 20000);
    }
  }
}
