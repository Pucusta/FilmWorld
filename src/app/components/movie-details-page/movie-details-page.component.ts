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

/* It gets the movie details, the cast, and the similar movies, and it also has a function to save the
movie */
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

  /**
   * We subscribe to the activatedRoute's params observable, and when the params change, we update the
   * movieId and check if the movie is saved
   */
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

  /**
   * We're using the concatObservableResults function to concatenate the results of the
   * getSimilarMovies function to the similarMovies array
   */
  loadMovies() {
    this.similarMovies = this.observableFunctions.concatObservableResults(this.similarMovies, this.movieService.getSimilarMovies(this.movieId, this.page));
    this.page++;
  }

  /**
   * If the movie is saved, change the text of the save button to "Saved". If the movie is not saved,
   * change the text of the save button to "Save"
   */
  checkIfSaved(){
    this.saved = this.saveService.isMovieSaved(this.movieId);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  /**
   * If the movie is saved, remove it from the saved list, otherwise add it to the saved list
   * @param element - The button element that was clicked.
   */
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