import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss']
})
export class BannerSearchComponent implements OnInit {

  searchType!: string;
 
  constructor() {
  }

  ngOnInit(): void {
  }

  elementFocus(event?: Event) {
    var elementFocus = (event?.target as HTMLElement);
    this.searchType = elementFocus.id;
    elementFocus.removeAttribute("readonly");
  }

  elementFocusOut(event?: Event) {
    var elementFocusOut = (event?.target as HTMLElement);
    elementFocusOut.style.content = '';
    elementFocusOut.setAttribute("readonly", "readonly");
  }
}
