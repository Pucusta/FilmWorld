import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MoviePageComponent } from '../movie-page/movie-page.component';
import { ShowPageComponent } from '../show-page/show-page.component';
import { PersonPageComponent } from '../person-page/person-page.component';
import { MovieDetailsPageComponent } from '../movie-details-page/movie-details-page.component';
import { PersonDetailsPageComponent } from '../person-details-page/person-details-page.component';
import { ShowDetailsPageComponent } from '../show-details-page/show-details-page.component';
import { SearchPageComponent } from '../search-page/search-page.component';
 
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
