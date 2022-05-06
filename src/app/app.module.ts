import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { PersonPageComponent } from './person-page/person-page.component';
import { MovieService } from './services/movie.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonService } from './services/person.service';
import { PersonDetailsPageComponent } from './person-details-page/person-details-page.component';
import { ShowService } from './services/show.service';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowDetailsPageComponent } from './show-details-page/show-details-page.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { FormsModule } from '@angular/forms';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchService } from './services/search.service';
import { SaveService } from './services/save.service';

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
    SearchPageComponent
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
    SaveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
