import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cineweb';
  currentRouter!: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(item => {
      if(item instanceof NavigationEnd) {
       this.currentRouter = location.path();
      }
    });
  }
}
