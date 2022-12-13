import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer as movieReducer } from './store/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerSearchComponent } from './components/banner-search/banner-search.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { LabelPageComponent } from './components/label-page/label-page.component';
import { CurrentMoviesComponent } from './page-components/current-movies/current-movies.component';
import { FutureMoviesComponent } from './page-components/future-movies/future-movies.component';
import { DetailsMoviesComponent } from './page-components/details-movies/details-movies.component';
import { NotFoundComponent } from './page-components/not-found/not-found.component';
import { HomeComponent } from './page-components/home/home.component';
import { FooterComponent } from './share-components/footer/footer.component';
import { TopbarComponent } from './share-components/topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PagesCarouselComponent } from './components/pages-carousel/pages-carousel.component';
import { SynopsisComponent } from './components/synopsis/synopsis.component';
import { DetailsComponent } from './components/details/details.component';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/movies.effects';
import { UserAccessComponent } from './page-components/user-access/user-access.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MoviesAdminComponent } from './page-components/movies-admin/movies-admin.component';
import { MoviesRegisterComponent } from './page-components/movies-register/movies-register.component';
import { MoviesFormComponent } from './components/movies-form/movies-form.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './page-components/cart/cart.component';
import { TicketRegisterComponent } from './page-components/ticket-register/ticket-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CurrentMoviesComponent,
    FutureMoviesComponent,
    DetailsMoviesComponent,
    DetailsComponent,
    NotFoundComponent,
    TopbarComponent,
    FooterComponent,
    CarouselComponent,
    HomeMenuComponent,
    LabelPageComponent,
    BannerSearchComponent,
    BannerComponent,
    PagesCarouselComponent,
    SynopsisComponent,
    UserAccessComponent,
    LoginFormComponent,
    MoviesAdminComponent,
    MoviesRegisterComponent,
    MoviesFormComponent,
    CartComponent,
    TicketRegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    EffectsModule.forRoot([MovieEffects]),
    StoreModule.forRoot({
      movies: movieReducer,
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'em-cartaz', component: CurrentMoviesComponent },
      { path: 'em-breve', component: FutureMoviesComponent },
      { path: 'movie-details', component: DetailsMoviesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: UserAccessComponent },
      { path: 'register', component: UserAccessComponent },
      { path: 'movies-admin', component: MoviesAdminComponent },
      { path: 'cadastro-de-filmes', component: MoviesRegisterComponent },
      { path: 'edicao-de-filmes', component: MoviesRegisterComponent },
      { path: 'cadastro-de-ingressos', component: TicketRegisterComponent },
      { path: '**', component: NotFoundComponent }
    ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [CartService, MovieEffects],
  bootstrap: [AppComponent]
})
export class AppModule { }
