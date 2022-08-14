import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  @Input() movie!: IMovie;
  @Output() upload: EventEmitter<any> = new EventEmitter();
  @Output() resetPreview: EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private router: Router, private store: Store<{movies: IMovie[]}>) { }

  ngOnInit(): void {
    this.formCreate();

    if(this.movie != undefined) {
      this.setFormValues();
    }
  }

  formCreate() {
    this.movieForm = this.formBuilder.group({
      title: [''],
      date: [''],
      genre: [''],
      status: [''],
      poster: [''],
      sinopse: [''],
      home: ['']
    });
  }

  setFormValues() {
    this.movieForm.controls['title'].setValue(this.movie.title);
    this.movieForm.controls['date'].setValue(this.movie.date.toLocaleString().split("T")[0]);
    this.movieForm.controls['genre'].setValue(this.movie.genre);
    this.movieForm.controls['status'].setValue("true");
    this.movieForm.controls['sinopse'].setValue(this.movie.sinopse);
    this.movieForm.controls['home'].setValue(this.movie.movieHome == true ? "true" : "false");
    this.localUrl = this.movie.moviePoster;
  }

  submitForm() {
    let title = this.movieForm.value['title'].toString().trimStart();
    let date = this.movieForm.value['date'].toString().trimStart();
    let genre = this.movieForm.value['genre'];
    let status = this.movieForm.value['status'];
    let sinopse = this.movieForm.value['sinopse'];
    let homePage = this.movieForm.value['home'];
    let poster = this.localUrl;

    let movie = {
      title: title, 
      date: date,
      genre: genre,
      movieHome: homePage == "true" ? true : false,
      moviePoster: poster,
      active: status == "true" ? true : false,
      sinopse: sinopse
    } as IMovie;

    if(this.movie != undefined) {
      this.moviesService.updateMovie(movie, this.movie.title)
      .subscribe((retorno) => {
        if(retorno) {
          alert("Filme atualizado com sucesso");
          this.movieForm.reset();
          this.resetPreview.emit();
          this.router.navigate(['/movies-admin']);
        }
        else {
          alert("Não foi possível atualizar o filme. Tente novamente mais tarde");
        }
      });
    }
    else
    {
      this.moviesService.saveMovie(movie)
      .subscribe((retorno) => {
        if(retorno) {
          alert("Filme cadastrado com sucesso");
          this.movieForm.reset();
          this.resetPreview.emit();
          this.router.navigate(['/movies-admin']);
        }
        else {
          alert("Não foi possível cadastrar o filme. Tente novamente mais tarde");
        }
      });
    }
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

  deletarFilme() {
    this.moviesService.deleteMovie(this.movie.title)
    .subscribe((retorno) => {
      if(retorno) {
        alert("Filme deleteado com sucesso");
        this.movieForm.reset();
        this.resetPreview.emit();
        this.router.navigate(['/movies-admin']);
      }
      else {
        alert("Não foi possível deletar o filme. Tente novamente mais tarde");
      }
    });
  }
}
