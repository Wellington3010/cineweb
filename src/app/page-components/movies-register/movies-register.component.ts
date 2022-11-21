import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-movies-register',
  templateUrl: './movies-register.component.html',
  styleUrls: ['./movies-register.component.scss']
})
export class MoviesRegisterComponent implements OnInit {
  urlImage: any = undefined;
  movieTitle!: string;
  fromPage!: string;
  movie!: IMovie;

  constructor(private effects: MovieEffects, private route: ActivatedRoute, private store: Store<{movies: IMovie[]}>) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.movieTitle = params['title'];
      this.fromPage = params['fromPage'];
    });

    if(this.fromPage == "admin-movies") {
      if(this.effects.cache.has(this.fromPage)) {
        var arrayMovies = this.effects.cache.get(this.fromPage);

        this.movie = arrayMovies?.find(x => x.titulo == this.movieTitle) as IMovie;
        this.urlImage = this.movie.poster;
      }
      else {
        this.effects.findMovieByParameter$.subscribe((item) => {
          this.movie = item.payload[0];
          this.urlImage = this.movie.poster;
        });

        this.store.dispatch({type: '[FindMoviesByParameter] Movies', parameter: this.movieTitle, parameterType: "title" });
      }
    }
  }

  onUpload(image: any) {
    this.urlImage = image;
  }

  resetPreview() {
    this.urlImage = undefined;
  }
}
