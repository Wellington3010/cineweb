import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { TicketDelete } from 'src/app/models/TicketDelete';
import { TicketRegister } from 'src/app/models/TicketRegister';
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
  selectedMovieTitle!: string;
  quantidadeIngressos!: number;
  selectedMovie!: IMovie;
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

    this.ticketForm = this.formBuilder.group({
      title: [''],
      ingressos: [''],
      preco: ['']
    });
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

  // setTicketsFormValues() {
  //   this.localUrl = this.movies[0].poster;
  // }

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

  cadastrarIngressos() {
    let cadastroIngressos = new TicketRegister (
      this.selectedMovie.titulo,
      this.ticketForm.controls['preco'].value,
      this.ticketForm.controls['ingressos'].value
    )

    this.moviesService.cadastrarIngressos(cadastroIngressos)
    .pipe()
    .subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
  }

  atualizarIngressos() {
    let cadastroIngressos = new TicketRegister (
      this.selectedMovie.titulo,
      this.ticketForm.controls['preco'].value,
      this.ticketForm.controls['ingressos'].value
    )

    this.moviesService.atualizarIngressos(cadastroIngressos)
    .pipe()
    .subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
  }

  deletarIngressos() {
    let remocaoIngressos = new TicketDelete (
      this.selectedMovie.titulo,
    )

    this.moviesService.deletarIngressos(remocaoIngressos)
    .pipe()
    .subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
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
    const result = this.movies.find(x => x.titulo == this.selectedMovieTitle) as any;
    this.quantidadeIngressos = result['quantidadeIngressos'];

    if(result['quantidadeIngressos'] == undefined) {
      this.ticketForm.controls['ingressos'].setValue(0);
    }
    else {
      this.ticketForm.controls['ingressos'].setValue(result['quantidadeIngressos']);
      this.ticketForm.controls['preco'].setValue(result['preco']);
    }
   
    this.selectedMovie = result;
    this.selectMovie.emit(result.poster);
  }
}
