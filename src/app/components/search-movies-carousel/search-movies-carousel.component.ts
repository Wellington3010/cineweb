import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-search-movies-carousel',
  templateUrl: './search-movies-carousel.component.html',
  styleUrls: ['./search-movies-carousel.component.scss']
})
export class SearchMoviesCarouselComponent implements OnInit {

  movies: Movie[] = [];
  movie!: Movie; 

  constructor() { }

  ngOnInit(): void {
    this.movie = { name: "", title: "", date: new Date(), poster: "", tickets: 10};
    this.movies.push(this.movie);
  }
}
