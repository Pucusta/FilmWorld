import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.type';
import { Person } from '../../models/person.type';
import { Show } from '../../models/show.type';
import { SaveService } from '../../services/save.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  savedMovies : Observable<Movie[]>;
  savedShows : Observable<Show[]>;
  savedPeople : Observable<Person[]>;

  constructor(private saveService : SaveService) { }

  ngOnInit(): void {
    this.savedMovies = this.saveService.getMoviesObservable();
    this.savedShows = this.saveService.getShowsObservable();
    this.savedPeople = this.saveService.getPeopleObservable();
  }
}
