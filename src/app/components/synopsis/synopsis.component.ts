import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  movie!: IMovie;
  @Input() movieTitle!: string;
  @Input() fromPage!: string;

  constructor(private effects: MovieEffects, private store: Store<{movies: IMovie[]}>) { }

  ngOnInit(): void {
    if(this.effects.cache.has(this.fromPage)) {
      var arrayMovies = this.effects.cache.get(this.fromPage);

      this.movie = arrayMovies?.find(x => x.titulo == this.movieTitle) as IMovie;
    }
    else {
      this.effects.findMovieByParameter$.subscribe((item) => this.movie = item.payload[0]);

      this.store.dispatch({type: '[FindMoviesByParameter] Movies', parameter: this.movieTitle, parameterType: "title" });
    }
  }

}
