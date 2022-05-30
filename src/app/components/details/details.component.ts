import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MoviesService } from 'src/app/services/movies.service';
import { StringLiteral } from 'typescript';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movie!: IMovie;
  @Input() movieTitle!: string;

  constructor(private moviesService: MoviesService ) { }

  ngOnInit(): void {
    this.moviesService
    .getMoviesByParameter(this.movieTitle, "title").subscribe((item) => {
      this.movie = (item as IMovie[])[0];
    });
  }
}
