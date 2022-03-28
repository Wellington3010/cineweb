import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrentMoviesComponent,
    FutureMoviesComponent,
    TopbarComponent,
    FooterComponent,
    CarouselComponent,
    BannerHomeComponent,
    HomeMenuComponent,
    LabelPageComponent,
    BannerSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'em-cartaz', component: CurrentMoviesComponent },
      { path: 'em-breve', component: FutureMoviesComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
