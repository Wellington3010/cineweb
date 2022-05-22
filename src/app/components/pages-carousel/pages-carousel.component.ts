import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MoviesServiceService } from 'src/app/services/movies-service.service';

@Component({
  selector: 'app-pages-carousel',
  templateUrl: './pages-carousel.component.html',
  styleUrls: ['./pages-carousel.component.scss']
})
export class PagesCarouselComponent implements OnInit {
  listMovies!: IMovie[];
  @Input() currentPage!: string;
  pagesNextButtonOver: boolean = false;
  pagesPreviousButtonOver: boolean = false;
  startMovie: number = 0;
  endMovie: number = 6;

  constructor(private moviesService: MoviesServiceService) { }

  ngOnInit(): void {
    let movies = new Map<String, void>();
    movies.set("current-movies", this.getCurrentMovies());
    movies.set("future-movies", this.getFutureMovies());
    movies.get(this.currentPage);
  }

  getCurrentMovies() : void {
    this.moviesService.getCurrentMovies().subscribe((list) => {
      this.listMovies = (list as IMovie[]);
    });
  }

  getFutureMovies(): void {
    this.moviesService.getComingSoonMovies().subscribe((list) => {
      this.listMovies = (list as IMovie[]);
    });
  }

  nextMovie() {
    if(this.endMovie < this.listMovies.length) {
      this.startMovie++;
      this.endMovie++;
    }

    return;
  }

  previousMovie() {
    if(this.startMovie != (this.listMovies.length - this.listMovies.length)) {
      this.startMovie--;
      this.endMovie--;
    }

    return;
  }
}

