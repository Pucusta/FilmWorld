import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { ShowPageComponent } from './components/show-page/show-page.component';
import { PersonPageComponent } from './components/person-page/person-page.component';
import { MovieService } from './services/movie.service';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieDetailsPageComponent } from './components/movie-details-page/movie-details-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonService } from './services/person.service';
import { PersonDetailsPageComponent } from './components/person-details-page/person-details-page.component';
import { ShowService } from './services/show.service';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ShowDetailsPageComponent } from './components/show-details-page/show-details-page.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchService } from './services/search.service';
import { SaveService } from './services/save.service';
import { ObservableFunctions } from './services/functions';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    MoviePageComponent,
    ShowPageComponent,
    PersonPageComponent,
    MovieDetailsComponent,
    MovieDetailsPageComponent,
    PersonDetailsComponent,
    PersonDetailsPageComponent,
    ShowDetailsComponent,
    ShowDetailsPageComponent,
    EpisodeDetailsComponent,
    SearchPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MovieService,
    PersonService,
    ShowService,
    SearchService,
    SaveService,
    ObservableFunctions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
