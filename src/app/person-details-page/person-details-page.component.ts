import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from '../models/movie.type';
import { Person, PersonCredits, PersonDetails } from '../models/person.type';
import { Show } from '../models/show.type';
import { Constants } from '../services/constants';
import { PersonService } from '../services/person.service';
import { SaveService } from '../services/save.service';

@Component({
  selector: 'app-person-details-page',
  templateUrl: './person-details-page.component.html',
  styleUrls: ['./person-details-page.component.css']
})
export class PersonDetailsPageComponent implements OnInit {

  person: Person;
  personId: number;
  movies: Movie[] = [];
  shows: Show[] = [];
  saved: boolean;

  constructor(private personService: PersonService, private saveService : SaveService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.personId = params.id);
    this.personService.getPerson(this.personId).subscribe({
      next: (person : PersonDetails) => this.person = {
        id: person.id,
        name: person.name,
        gender: person.gender == 1 ? 'woman' : 'man',
        birthday: person.birthday,
        biography: person.biography,
        place_of_birth: person.place_of_birth,
        profile_path: person.profile_path == null ? "./assets/images/person_placeholder.jpeg" : Constants.apiProfileUrl + person.profile_path
      },
      error: (error) => console.error(error),
      complete: () => this.checkIfSaved()
    });
    this.loadMovies();
    this.loadShows();
  }

  loadMovies(){
    this.personService.getMovieCredits(this.personId).subscribe({
      next: (data : PersonCredits) => data.cast.forEach(cast => this.movies.push({
        id : cast.id,
        title : cast.title,
        release_year : cast.release_date.substring(0, 4),
        release_date : cast.release_date,
        runtime : null,
        genres : null,
        overview : cast.overview,
        vote_average : cast.vote_average,
        poster_path : cast.poster_path == null ? "./assets/images/poster_placeholder.png" : Constants.apiPosterUrl + cast.poster_path
      })),
      error: (error) => console.error(error)
    });
  }

  loadShows(){
    this.personService.getShowCredits(this.personId).subscribe({
      next: (data : PersonCredits) => data.cast.forEach(cast => this.shows.push({
        id: cast.id,
        name: cast.name,
        first_air_date: cast.first_air_date,
        genres: null,
        vote_average: cast.vote_average,
        overview: cast.overview,
        num_of_episodes: null,
        num_of_seasons: null,
        poster_path: cast.poster_path == null ? "./assets/images/poster_placeholder.png" : Constants.apiPosterUrl + cast.poster_path,
        seasons: null
      })),
      error: (error) => console.error(error)
    });
  }

  checkIfSaved(){
    this.saved = this.saveService.isPersonSaved(this.person);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  save(element) {
    if (this.saved) {
      this.saveService.removePerson(this.person);
      element.textContent = 'Save';
    } else {
      this.saveService.savePerson(this.person);
      element.textContent = 'Saved';
    }
    this.saved = !this.saved;
  }
}
