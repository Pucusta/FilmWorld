import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Genre } from '../models/genre.type';
import { MovieDetails, Movie, MovieCredits } from '../models/movie.type';
import { Person } from '../models/person.type';
import { Constants } from '../services/constants';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {

  movie: Movie;
  movieId: number;
  similarMovies: Movie[] = [];
  cast: Person[] = [];
  page: number = 1;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.movieId = params.id);
    this.movieService.getMovie(this.movieId).subscribe(
        (data : MovieDetails) => this.movie = {
          id : data.id,
          title : data.title,
          release_year : data.release_date.substring(0, 4),
          release_date : data.release_date,
          runtime : data.runtime,
          genres : data.genres,
          overview : data.overview,
          vote_average : data.vote_average,
          poster_path : Constants.apiPosterUrl + data.poster_path
      }
    );
    this.loadMovies();
    this.loadCast();
  }

  loadMovies() {
    this.movieService.getSimilarMovies(this.movieId, this.page).subscribe(
      data => data.results.forEach(movie => this.similarMovies.push({
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
    this.page++;
  }

  loadCast() {
    this.movieService.getCredits(this.movieId).subscribe(
      (credits : MovieCredits) => credits.cast.forEach(person => this.cast.push({
        id: person.id,
        name: person.name,
        gender: person.gender == 1 ? 'woman' : 'man',
        birthday: null,
        biography: null,
        place_of_birth: null,
        profile_path: Constants.apiProfileUrl + person.profile_path
      }))
    )
  }

}
