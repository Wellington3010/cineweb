import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieEffects } from 'src/app/store/movies.effects';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss']
})
export class BannerSearchComponent implements OnInit {
  @Input() page!: string;
  movieForm!: FormGroup;
  searchButtonOver: boolean = false;
  disableTitle: boolean = false;
  disableGenre: boolean = false;
  disableDate: boolean = false;
  disableStatus: boolean = false;
 
  constructor(private formBuilder: FormBuilder, private store: Store<{movies: IMovie[]}>, private effects: MovieEffects) {
  }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.movieForm = this.formBuilder.group({
      title: [''],
      date: [''],
      genre: [''],
      status: ['']
    });
  }

  submitForm() {

    if(this.movieForm.value['title'] != null) {
      this.store.dispatch({ type: '[FindMoviesByParameter] Movies', parameter: this.movieForm.value['title'], parameterType: "title", page: this.page })
    }

    if(this.movieForm.value['date'] != null) {
      this.store.dispatch({ type: '[FindMoviesByParameter] Movies', parameter: this.movieForm.value['date'], parameterType: "date", page: this.page })
    }

    if(this.movieForm.value['genre'] != null) {
      this.store.dispatch({ type: '[FindMoviesByParameter] Movies', parameter: this.movieForm.value['genre'], parameterType: "genre", page: this.page })
    }

    if(this.movieForm.value['status'] != null) {
      this.store.dispatch({ type: '[FindMoviesByParameter] Movies', parameter: this.movieForm.value['status'], parameterType: "status", page: this.page })
    }

    this.movieForm.reset();
  }

  setSearchButtonOver() {
    this.searchButtonOver = !this.searchButtonOver;
  }

  focusEvent(event: Event) {
    var element = (event.currentTarget as HTMLElement);

    if (event.type == "focusout") {
      this.disableTitle = false;
      this.disableDate = false;
      this.disableGenre = false;
      this.disableStatus = false;
      this.movieForm.controls["title"].enable();
      this.movieForm.controls["date"].enable();
      this.movieForm.controls["genre"].enable();
      this.movieForm.controls["status"].enable();
    }

    if (element.id == "title" && event.type == "focus") {
      this.setDisableDate();
      this.setDisableGenre();
      this.setDisableStatus();
      this.movieForm.controls['date'].reset();
      this.movieForm.controls['genre'].reset();
      this.movieForm.controls['status'].reset();
    }

    if (element.id == "date" && event.type == "focus") {
      this.setDisableTitle();
      this.setDisableGenre();
      this.setDisableStatus();
      this.movieForm.controls['title'].reset();
      this.movieForm.controls['genre'].reset();
      this.movieForm.controls['status'].reset();
    }

    if (element.id == "genre" && event.type == "focus") {
      this.setDisableTitle();
      this.setDisableDate();
      this.setDisableStatus();
      this.movieForm.controls['title'].reset();
      this.movieForm.controls['date'].reset();
      this.movieForm.controls['status'].reset();
    }

    if (element.id == "status" && event.type == "focus") {
      this.setDisableTitle();
      this.setDisableDate();
      this.setDisableGenre();
      this.movieForm.controls['title'].reset();
      this.movieForm.controls['date'].reset();
      this.movieForm.controls['genre'].reset();
    }
  }

  setDisableTitle() {
    this.disableTitle = true;
    this.movieForm.controls["title"].disable();
  }

  setDisableDate() {
    this.disableDate = true;
    this.movieForm.controls["date"].disable();
  }

  setDisableGenre() {
    this.disableGenre = true;
    this.movieForm.controls["genre"].disable();
  }

  setDisableStatus() {
    this.disableStatus = true;
    this.movieForm.controls["status"].disable();
  }
}
