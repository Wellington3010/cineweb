import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  detailsMoviePage!: boolean;
  currentRouter!: string;
  topbarIconColor!: string;

  constructor(private location: Location) {
  }

  ngOnInit(): void {
    this.location.onUrlChange((url) => {
      this.currentRouter = this.location.path(false);
      this.detailsMoviePage = this.location.path(false).startsWith('/movie-details') || this.location.path(false).startsWith('/login');
    });
  }
}
