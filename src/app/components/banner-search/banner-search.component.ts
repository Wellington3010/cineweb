import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss']
})
export class BannerSearchComponent implements OnInit {
  movieForm!: FormGroup;
  searchButtonOver: boolean = false;
  disableTitle: boolean = false;
  disableGenre: boolean = false;
  disableDate: boolean = false;
 
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.movieForm = this.formBuilder.group({
      title: [''],
      date: [''],
      genre: ['']
    });
  }

  submitForm(){
    console.log(this.movieForm.value);
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
      this.movieForm.controls["title"].enable();
      this.movieForm.controls["date"].enable();
      this.movieForm.controls["genre"].enable();
      this.movieForm.reset();
    }

    if (element.id == "title" && event.type == "focus") {
      this.setDisableDate();
      this.setDisableGenre();
    }

    if (element.id == "date" && event.type == "focus") {
      this.setDisableTitle();
      this.setDisableGenre();
    }

    if (element.id == "genre" && event.type == "focus") {
      this.setDisableTitle();
      this.setDisableDate();
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
}
