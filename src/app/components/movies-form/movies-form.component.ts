import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.scss']
})
export class MoviesFormComponent implements OnInit {
  movieForm!: FormGroup;
  localUrl: any;
  file!: File;
  @Output() upload: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

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
