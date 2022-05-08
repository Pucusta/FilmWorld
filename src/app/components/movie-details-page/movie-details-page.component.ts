import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Credits } from '../../models/credits.type';
import { Movie, MovieCast } from '../../models/movie.type';
import { Result } from '../../models/result.type';
import { Constants } from '../../services/constants';
import { ObservableFunctions } from '../../services/functions';
import { MovieService } from '../../services/movie.service';
import { SaveService } from '../../services/save.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {

  movie: Observable<Movie>;
  movieId: number;
  similarMovies: Observable<Result<Movie>>;
  cast: Observable<Credits<MovieCast>>;
  page: number = 1;
  saved: boolean;
  placeholder: string = Constants.posterPlaceholderPath;
  apiPosterUrl: string = Constants.apiPosterUrl;

  constructor(
    private movieService: MovieService,
    private saveService : SaveService,
    private activatedRoute: ActivatedRoute,
    private observableFunctions: ObservableFunctions) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.movieId = params.id;
      this.checkIfSaved();
    });
    this.movie = this.movieService.getMovie(this.movieId);
    this.cast = this.movieService.getCredits(this.movieId);
    this.similarMovies = this.movieService.getSimilarMovies(this.movieId, this.page);
    this.page++;
  }

  loadMovies() {
    let movies = this.movieService.getSimilarMovies(this.movieId, this.page);
    this.similarMovies = this.observableFunctions.concatObservableResults(this.similarMovies, movies);
    this.page++;
  }

  checkIfSaved(){
    this.saved = this.saveService.isMovieSaved(this.movieId);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  save(element) {
    if (this.saved) {
      this.saveService.removeMovie(this.movieId);
      element.textContent = 'Save';
    } else {
      this.saveService.saveMovie(this.movie);
      element.textContent = 'Saved';
    }
    this.saved = !this.saved;
  }
}

/*
ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.movieId = params.id);
    this.movieService.getMovie(this.movieId).subscribe({
        next: (data : MovieDetails) => this.movie = {
          id : data.id,
          title : data.title,
          release_year : data.release_date.substring(0, 4),
          release_date : data.release_date,
          runtime : data.runtime,
          genres : data.genres,
          overview : data.overview,
          vote_average : data.vote_average,
          poster_path : data.poster_path == null ? Constants.posterPlaceholderPath : Constants.apiPosterUrl + data.poster_path
        },
        error: (error) => console.error(error),
        complete: () => this.checkIfSaved()
    });
    this.loadMovies();
    this.loadCast();
  }

  loadMovies() {
    this.movieService.getSimilarMovies2(this.movieId, this.page).subscribe({
      next: data => data.results.forEach(movie => this.similarMovies.push({
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
    this.page++;
  }
*/