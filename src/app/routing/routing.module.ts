import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MoviePageComponent } from '../components/movie-page/movie-page.component';
import { ShowPageComponent } from '../components/show-page/show-page.component';
import { PersonPageComponent } from '../components/person-page/person-page.component';
import { MovieDetailsPageComponent } from '../components/movie-details-page/movie-details-page.component';
import { PersonDetailsPageComponent } from '../components/person-details-page/person-details-page.component';
import { ShowDetailsPageComponent } from '../components/show-details-page/show-details-page.component';
import { SearchPageComponent } from '../components/search-page/search-page.component';
 
/* Defining the routes for the application. */
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'movie', component: MoviePageComponent },
  { path: 'movie/:id', component: MovieDetailsPageComponent},
  { path: 'show', component: ShowPageComponent },
  { path: 'show/:id', component: ShowDetailsPageComponent },
  { path: 'person', component: PersonPageComponent },
  { path: 'person/:id', component: PersonDetailsPageComponent },
  { path: 'search', component: SearchPageComponent}
];
 
/* The RoutingModule class is a module that imports the CommonModule and the RouterModule, and exports
the RouterModule */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }