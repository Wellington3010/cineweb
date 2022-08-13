import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {
  movieForm!: FormGroup;
  localUrl!: any;
  file!: File;
  @Output() upload: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.movieForm = this.formBuilder.group({
      title: [''],
      date: [''],
      genre: [''],
      status: [''],
      poster: ['']
    });
  }

  submitForm() {
    let title = this.movieForm.value['title'].toString().trimStart();
    let date = this.movieForm.value['date'].toString().trimStart();
    let genre = this.movieForm.value['genre'];
    let status = this.movieForm.value['status'];
    let poster = this.localUrl;

    let movie = {
      title: title, 
      date: date,
      genre: genre,
      movieHome: false,
      moviePoster: poster,
      active: status == "true" ? true : false
    } as IMovie;

    console.log(movie);
    this.moviesService.saveMovie(movie);
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.upload.emit(this.localUrl);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  } 
}
