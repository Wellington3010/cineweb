import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movie!: IMovie;
  @Input() movieTitle!: string;

  constructor(private effects: MovieEffects, private store: Store<{movies: IMovie[]}>) { }

  ngOnInit(): void {
    this.effects.findMovieByParameter$.subscribe((item) => this.movie = item.payload[0]);

    this.store.dispatch({type: '[FindMoviesByParameter] Movies', title: this.movieTitle });
  }
}
