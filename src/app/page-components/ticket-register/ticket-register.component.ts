import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-ticket-register',
  templateUrl: './ticket-register.component.html',
  styleUrls: ['./ticket-register.component.scss']
})
export class TicketRegisterComponent implements OnInit {
  fromPage!: string;
  listOfMovies: IMovie[] = [];
  urlImage: any = undefined;

  constructor(private route: ActivatedRoute, private effects: MovieEffects, private store: Store<{movies: IMovie[]}>) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromPage = params['fromPage'];
    });

    if(this.effects.cache.has(this.fromPage)) {
      this.listOfMovies = this.effects.cache.get(this.fromPage) as IMovie[];
    }
    else {
      this.effects.allMoviesWithCache$.subscribe((item) => this.listOfMovies = item.payload);

      this.store.dispatch({type: '[AllMovies Movies With Cache] Movies' });
    }
  }

  onUpload(image: any) {
    this.urlImage = image;
  }

  resetPreview() {
    this.urlImage = undefined;
  }

  onSelectMovie(image: any) {
    this.urlImage = image;
  }
}
