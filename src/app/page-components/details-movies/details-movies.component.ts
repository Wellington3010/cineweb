import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-movies',
  templateUrl: './details-movies.component.html',
  styleUrls: ['./details-movies.component.scss']
})
export class DetailsMoviesComponent implements OnInit {
  movieTitle!: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.movieTitle = params['title'];
    });
  }
}
