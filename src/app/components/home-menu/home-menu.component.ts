import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {

  buttonOverOne!: boolean;
  buttonOverTwo!: boolean;
  buttonOverThree!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.buttonOverOne = false;
    this.buttonOverTwo = false;
    this.buttonOverThree = false;
  }

}
