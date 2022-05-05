import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieResult } from '../models/movie.type';
import { Person, PersonResult } from '../models/person.type';
import { Show, ShowResult } from '../models/show.type';
import { Constants } from '../services/constants';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchTerm: string;
  movies: Movie[] = [];
  shows: Show[] = [];
  people: Person[] = [];
  moviePage: number = 1;
  showPage: number = 1;
  personPage: number = 1;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.searchTerm = params.search_term);
    console.log(this.searchTerm);
    this.loadMovies();
    this.loadShows();
    this.loadPeople();
  }

  loadMovies() {
    this.searchService.getMovieSearch(this.searchTerm, this.moviePage).subscribe(
      (data : MovieResult) => data.results.forEach(movie => this.movies.push({
        id : movie.id,
        title : movie.title,
        release_year : movie.release_date.substring(0, 4),
        release_date : movie.release_date,
        runtime : null,
        genres : null,
        overview : movie.overview,
        vote_average : movie.vote_average,
        poster_path : Constants.apiPosterUrl + movie.poster_path
      })) 
    );
    this.moviePage++;
  }
  
  loadShows() {
    this.searchService.getShowSearch(this.searchTerm, this.showPage).subscribe(
      (data : ShowResult) => data.results.forEach(show => this.shows.push({
        id: show.id,
        name: show.name,
        first_air_date: show.first_air_date,
        genres: null,
        vote_average: show.vote_average,
        overview: show.overview,
        num_of_episodes: null,
        num_of_seasons: null,
        poster_path: Constants.apiPosterUrl + show.poster_path,
        seasons: null
      }))
    );
    this.showPage++;
  }
  
  loadPeople() {
    this.searchService.getPersonSearch(this.searchTerm, this.personPage).subscribe(
      (data : PersonResult) => data.results.forEach(person => this.people.push({
        id: person.id,
        name: person.name,
        gender: person.gender == 1 ? 'woman' : 'man',
        birthday: null,
        biography: null,
        place_of_birth: null,
        profile_path: Constants.apiProfileUrl + person.profile_path
      }))
    );
    this.personPage++;
  }
}