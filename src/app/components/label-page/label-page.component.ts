import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-page',
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.scss']
})
export class LabelPageComponent implements OnInit {

  @Input() page!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
