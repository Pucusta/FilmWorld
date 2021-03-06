import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.type';
import { Person } from '../../models/person.type';
import { Result } from '../../models/result.type';
import { Show } from '../../models/show.type';
import { Constants } from '../../services/constants';
import { ObservableFunctions } from '../../services/functions';
import { SearchService } from '../../services/search.service';

/* It's a component that searches for movies, shows, and people */
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchTerm: string;
  movies: Observable<Result<Movie>>;
  shows: Observable<Result<Show>>;
  people: Observable<Result<Person>>;
  moviePage: number = 1;
  showPage: number = 1;
  personPage: number = 1;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private observableFunctions: ObservableFunctions) { }

  /**
   * We subscribe to the queryParams observable, which is an observable that emits whenever the query
   * parameters change. We then use the search term to make a call to the search service, which returns
   * an observable of the search results. We then subscribe to that observable and assign the results
   * to the movies, shows, and people variables
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.searchTerm = params.search_term);
    this.movies = this.searchService.getMovieSearch(this.searchTerm, this.moviePage);
    this.moviePage++;
    this.shows = this.searchService.getShowSearch(this.searchTerm, this.showPage);
    this.showPage++;
    this.people = this.searchService.getPersonSearch(this.searchTerm, this.personPage);
    this.personPage++;
  }

  /**
   * We're taking the results of the first observable, and concatenating the results of the second
   * observable to it
   */
  loadMovies() {
    this.movies = this.observableFunctions.concatObservableResults(this.movies, this.searchService.getMovieSearch(this.searchTerm, this.moviePage));
    this.moviePage++;
  }
  
  /**
   * We're taking the results of the first observable, and concatenating the results of the second
   * observable to it
   */
  loadShows() {
    this.shows = this.observableFunctions.concatObservableResults(this.shows, this.searchService.getShowSearch(this.searchTerm, this.showPage));
    this.showPage++;
  }
  
  /**
   * We're taking the results of the first search and concatenating them with the results of the second
   * search
   */
  loadPeople() {
    this.people = this.observableFunctions.concatObservableResults(this.people, this.searchService.getPersonSearch(this.searchTerm, this.personPage));
    this.personPage++;
  }
}