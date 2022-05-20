import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerSearchComponent } from './components/banner-search/banner-search.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { LabelPageComponent } from './components/label-page/label-page.component';
import { CurrentMoviesComponent } from './page-components/current-movies/current-movies.component';
import { FutureMoviesComponent } from './page-components/future-movies/future-movies.component';
import { HomeComponent } from './page-components/home/home.component';
import { FooterComponent } from './share-components/footer/footer.component';
import { TopbarComponent } from './share-components/topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PagesCarouselComponent } from './pages-carousel/pages-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrentMoviesComponent,
    FutureMoviesComponent,
    TopbarComponent,
    FooterComponent,
    CarouselComponent,
    HomeMenuComponent,
    LabelPageComponent,
    BannerSearchComponent,
    BannerComponent,
    PagesCarouselComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'em-cartaz', component: CurrentMoviesComponent },
      { path: 'em-breve', component: FutureMoviesComponent },
    ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
