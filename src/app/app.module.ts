import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CurrentMoviesComponent } from './page-components/current-movies/current-movies.component';
import { FutureMoviesComponent } from './page-components/future-movies/future-movies.component';
import { HomeComponent } from './page-components/home/home.component';
import { FooterComponent } from './share-components/footer/footer.component';
import { TopbarComponent } from './share-components/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrentMoviesComponent,
    FutureMoviesComponent,
    TopbarComponent,
    FooterComponent,
    CarouselComponent,
    BannerHomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'em-cartaz', component: CurrentMoviesComponent },
      { path: 'em-breve', component: FutureMoviesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
