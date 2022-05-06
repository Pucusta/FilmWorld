import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.type';
import { Person } from '../models/person.type';
import { Show } from '../models/show.type';
import { SaveService } from '../services/save.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  savedMovies : Movie[];
  savedShows : Show[];
  savedPeople : Person[];

  constructor(private saveService : SaveService) { }

  ngOnInit(): void {
    this.savedMovies = this.saveService.getMovies();
    this.savedShows = this.saveService.getShows();
    this.savedPeople = this.saveService.getPeople();
  }
}
