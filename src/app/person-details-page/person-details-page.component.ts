import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from '../models/movie.type';
import { Person, PersonCredits, PersonDetails } from '../models/person.type';
import { Show } from '../models/show.type';
import { Constants } from '../services/constants';
import { MovieService } from '../services/movie.service';
import { PersonService } from '../services/person.service';
import { ShowService } from '../services/show.service';

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

  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.personId = params.id);
    this.personService.getPerson(this.personId).subscribe(
      (person : PersonDetails) => this.person = {
        id: person.id,
        name: person.name,
        gender: person.gender == 1 ? 'woman' : 'man',
        birthday: person.birthday,
        biography: person.biography,
        place_of_birth: person.place_of_birth,
        profile_path: Constants.apiProfileUrl + person.profile_path
      }
    );
    this.loadMovies();
    this.loadShows();
  }

  loadMovies(){
    this.personService.getMovieCredits(this.personId).subscribe(
      (data : PersonCredits) => data.cast.forEach(cast => this.movies.push({
        id : cast.id,
        title : cast.title,
        release_year : cast.release_date.substring(0, 4),
        release_date : cast.release_date,
        runtime : null,
        genres : null,
        overview : cast.overview,
        vote_average : cast.vote_average,
        poster_path : Constants.apiPosterUrl + cast.poster_path
      }))
    );
  }

  loadShows(){
    this.personService.getShowCredits(this.personId).subscribe(
      (data : PersonCredits) => data.cast.forEach(cast => this.shows.push({
        id: cast.id,
        name: cast.name,
        first_air_date: cast.first_air_date,
        genres: null,
        vote_average: cast.vote_average,
        overview: cast.overview,
        num_of_episodes: null,
        num_of_seasons: null,
        poster_path: Constants.apiPosterUrl + cast.poster_path,
        seasons: null
      }))
    );
  }

}
