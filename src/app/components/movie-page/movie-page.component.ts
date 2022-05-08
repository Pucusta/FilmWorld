import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../../models/movie.type';
import { Result } from '../../models/result.type';
import { Constants } from '../../services/constants';
import { ObservableFunctions } from '../../services/functions';
import { MovieService } from '../../services/movie.service';

/* This class is a component that displays a list of popular movies */
@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  popularMovies: Observable<Result<Movie>>;
  page: number = 1;

  constructor(private movieService: MovieService, private observableFunctions: ObservableFunctions) { }

  /**
   * We're calling the getPopularMovies() function from the movieService and assigning the result to
   * the popularMovies variable
   */
  ngOnInit(): void {
    this.popularMovies = this.movieService.getPopularMovies(this.page);
    this.page++;
  }

  /**
   * We're taking the results of the first observable, and concatenating the results of the second
   * observable to it
   */
  loadMovies() {
    this.popularMovies = this.observableFunctions.concatObservableResults(this.popularMovies, this.movieService.getPopularMovies(this.page));
    this.page++;
  }
}
