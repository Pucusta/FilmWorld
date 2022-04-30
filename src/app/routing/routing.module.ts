import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MoviePageComponent } from '../movie-page/movie-page.component';
import { ShowPageComponent } from '../show-page/show-page.component';
import { PersonPageComponent } from '../person-page/person-page.component';
 
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'movie', component: MoviePageComponent },
  { path: 'show', component: ShowPageComponent },
  { path: 'person', component: PersonPageComponent }
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
