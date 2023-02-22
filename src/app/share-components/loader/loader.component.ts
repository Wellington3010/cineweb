import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations:[
    trigger('loaderTrigger', [
      transition(':enter', [
        animate('2s', style({ opacity: 0.5 }))
      ]),
      transition(':leave', [
        animate('2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit {
  mostrarLoader: boolean = false;

  constructor(private loaderService: LoaderService) {
    
  }

  ngOnInit(): void {
    this.loaderService.loaderSubject.subscribe((item) => {
      this.mostrarLoader = item;
    })
  }
}
