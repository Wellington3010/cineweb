import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {
  movieForm!: FormGroup;
  ticketForm!: FormGroup;
  localUrl!: any;
  file!: File;
  selectedMovie!: any;
  @Input() movie!: IMovie;
  @Input() movies!: IMovie[];
  @Input() currentPage!: string;
  @Output() upload: EventEmitter<any> = new EventEmitter();
  @Output() selectMovie: EventEmitter<any> = new EventEmitter();
  @Output() resetPreview: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.formCreate();

    if(this.movie != undefined) {
      this.setMovieFormValues();
    }

    if(this.movies != undefined) {
      this.setTicketsFormValues();
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

    // this.ticketForm = this.formBuilder.group({
    //   title: [''],
    //   poster: [''],
    //   quantidadeIngressos: ['']
    // });
  }

  setMovieFormValues() {
    this.movieForm.controls['title'].setValue(this.movie.titulo);
    this.movieForm.controls['date'].setValue(this.movie.data.toLocaleString().split("T")[0]);
    this.movieForm.controls['genre'].setValue(this.movie.genero);
    this.movieForm.controls['status'].setValue("true");
    this.movieForm.controls['sinopse'].setValue(this.movie.sinopse);
    this.movieForm.controls['home'].setValue(this.movie.homeMovie == true ? "ativo" : "inativo");
    this.localUrl = this.movie.poster;
  }

  setTicketsFormValues() {
    // this.movieForm.controls['title'].setValue(this.movies[0].titulo);
    // this.movieForm.controls['quantidadeIngressos'].setValue(this.movies[0].QuantidadeIngressos);
    this.localUrl = this.movies[0].poster;
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
      titulo: title, 
      data: date,
      genero: genre,
      homeMovie: homePage == "ativo" ? true : false,
      poster: poster,
      active: status == "true" ? true : false,
      sinopse: sinopse
    } as IMovie;

    if(this.movie != undefined) {
      this.moviesService.updateMovie(movie, this.movie.titulo)
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
    this.moviesService.deleteMovie(this.movie.titulo)
    .subscribe((retorno) => {
      if(retorno) {
        alert("Filme deletado com sucesso");
        this.movieForm.reset();
        this.resetPreview.emit();
        this.router.navigate(['/movies-admin']);
      }
      else {
        alert("Não foi possível deletar o filme. Tente novamente mais tarde");
      }
    });
  }

  selectMovieChange(movie: IMovie) {
    let result = this.movies.find(x => x.titulo == this.selectedMovie) as IMovie;
    this.selectMovie.emit(result.poster);
  }
}
