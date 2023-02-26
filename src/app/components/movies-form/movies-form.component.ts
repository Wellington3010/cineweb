import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/IMovie';
import { MovieError } from 'src/app/models/MovieError';
import { TicketDelete } from 'src/app/models/TicketDelete';
import { TicketRegister } from 'src/app/models/TicketRegister';
import { MoviesService } from 'src/app/services/movies.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.formCreate();

    if(this.movie != undefined) {
      this.setMovieFormValues();
    }
  }

  formCreate() {
    this.movieForm = this.formBuilder.group({
      titulo: [''],
      data: [''],
      genero: [''],
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
    this.movieForm.controls['titulo'].setValue(this.movie.titulo);
    this.movieForm.controls['data'].setValue(this.movie.data.toLocaleString().split("T")[0]);
    this.movieForm.controls['genero'].setValue(this.movie.genero);
    this.movie.active ? this.movieForm.controls['status'].setValue("true") : this.movieForm.controls['status'].setValue("false");
    this.movieForm.controls['sinopse'].setValue(this.movie.sinopse);
    this.movieForm.controls['home'].setValue(this.movie.homeMovie);
    this.localUrl = this.movie.poster;
  }

  submitForm() {
    let title = this.movieForm.value['titulo'].toString().trimStart();
    let date = this.movieForm.value['data'].toString().trimStart();
    let genre = this.movieForm.value['genero'];
    let status = JSON.parse(this.movieForm.value['status']);
    let sinopse = this.movieForm.value['sinopse'];
    let homePage = JSON.parse(this.movieForm.value['home']);
    let poster = this.localUrl;

    let movie = {
      titulo: title, 
      data: date,
      genero: genre,
      homeMovie: homePage,
      poster: poster,
      active: status,
      sinopse: sinopse
    } as IMovie;

    if(this.movie != undefined) {
      this.movie.poster = this.localUrl;
      this.moviesService.updateMovie(movie, this.movie.titulo)
      .pipe()
      .subscribe({
        next:(retorno) => this.tratarRetornoAoAtualizarFilme(retorno),
        error:() => this.notificationService.danger("Erro ao atualizar o cadastro. Verifique o preenchimento dos campos e tente novamente")
      });
    }
    else
    {
      this.moviesService.saveMovie(movie)
      .pipe()
      .subscribe({
        next:(retorno) => this.tratarRetornoAoCadastrarFilme(retorno),
        error:(error: any) => this.tratarRetornoComErro(error)
      });
    }
  }

  tratarRetornoAoAtualizarFilme(retorno: boolean) {
    if(retorno) {
      this.notificationService.success("Filme atualizado com sucesso");
      this.movieForm.reset();
      this.resetPreview.emit();
      this.router.navigate(['/movies-admin']);
    }
    else {
      this.notificationService.danger("Não foi possível atualizar o filme. Tente novamente mais tarde");
    }
  }

  tratarRetornoAoCadastrarFilme(retorno: boolean) {
    if(retorno) {
      this.notificationService.success("Filme cadastrado com sucesso");
      this.movieForm.reset();
      this.resetPreview.emit();
      this.router.navigate(['/movies-admin']);
    }
    else {
      this.notificationService.danger("Não foi possível cadastrar o filme. Tente novamente mais tarde");
    }
  }

  tratarRetornoComErro(error: any) {
    let errors = error.error['errors'] as MovieError;

   if(errors != undefined) {

    if(errors.Active != undefined && errors.Active.length > 0) {
      this.notificationService.danger(errors.Active[0]);
    }

    if(errors.Poster != undefined && errors.Poster.length > 0) {
      this.notificationService.danger(errors.Poster[0]);
    }

    if(errors.Titulo != undefined && errors.Titulo.length > 0) {
      this.notificationService.danger(errors.Titulo[0]);
    }

    if(errors.Sinopse != undefined && errors.Sinopse.length > 0) {
      this.notificationService.danger(errors.Sinopse[0]);
    }

    if(errors.Data != undefined && errors.Data.length > 0) {
      this.notificationService.danger(errors.Data[0]);
    }

    if(errors.Genero != undefined && errors.Genero.length > 0) {
      this.notificationService.danger(errors.Genero[0]);
    }
   }
   else {
    this.notificationService.danger("Não foi possível concluir a operação");
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
      next: (result) => this.onTicketManagerSuccess("Ingressos cadastrados com sucesso"),
      error: (error) => alert("Não foi possível realizar a operação. Contate o suporte técnico")
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
      next: (result) => this.onTicketManagerSuccess("Ingressos atualizados com sucesso"),
      error: (error) => alert("Não foi possível realizar a operação. Contate o suporte técnico")
    });
  }

  deletarIngressos() {
    let remocaoIngressos = new TicketDelete (
      this.selectedMovie.titulo,
    )

    this.moviesService.deletarIngressos(remocaoIngressos)
    .pipe()
    .subscribe({
      next: (result) => this.onTicketManagerSuccess("Ingressos deletados com sucesso"),
      error: (error) => alert("Não foi possível realizar a operação. Contate o suporte técnico")
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

  onTicketManagerSuccess(message :string) {
    alert(message);
    this.router.navigate(['/movies-admin'])
  }
}
