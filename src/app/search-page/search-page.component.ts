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
    this.loadMovies();
    this.loadShows();
    this.loadPeople();
  }

  loadMovies() {
    this.searchService.getMovieSearch(this.searchTerm, this.moviePage).subscribe({
      next: (data : MovieResult) => data.results.forEach(movie => this.movies.push({
        id : movie.id,
        title : movie.title,
        release_year : movie.release_date.substring(0, 4),
        release_date : movie.release_date,
        runtime : null,
        genres : null,
        overview : movie.overview,
        vote_average : movie.vote_average,
        poster_path : movie.poster_path == null ? "./assets/images/poster_placeholder.png" : Constants.apiPosterUrl + movie.poster_path
      })),
      error: (error) => console.error(error)
    });
    this.moviePage++;
  }
  
  loadShows() {
    this.searchService.getShowSearch(this.searchTerm, this.showPage).subscribe({
      next: (data : ShowResult) => data.results.forEach(show => this.shows.push({
        id: show.id,
        name: show.name,
        first_air_date: show.first_air_date,
        genres: null,
        vote_average: show.vote_average,
        overview: show.overview,
        num_of_episodes: null,
        num_of_seasons: null,
        poster_path: show.poster_path == null ? "./assets/images/poster_placeholder.png" : Constants.apiPosterUrl + show.poster_path,
        seasons: null
      })),
      error: (error) => console.error(error)
    });
    this.showPage++;
  }
  
  loadPeople() {
    this.searchService.getPersonSearch(this.searchTerm, this.personPage).subscribe({
      next: (data : PersonResult) => data.results.forEach(person => this.people.push({
        id: person.id,
        name: person.name,
        gender: person.gender == 1 ? 'woman' : 'man',
        birthday: null,
        biography: null,
        place_of_birth: null,
        profile_path: person.profile_path == null ? "./assets/images/person_placeholder.jpeg" : Constants.apiProfileUrl + person.profile_path
      })),
      error: (error) => console.error(error)
    });
    this.personPage++;
  }
}