import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.scss']
})
export class UploadPreviewComponent implements OnInit {
  urlImage: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
