import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.type';
import { Constants } from '../services/constants';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  popularMovies: Movie[] = [];
  page: number = 1;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getPopularMovies(this.page).subscribe(
      data => data.results.forEach(popMovie => this.popularMovies.push({
        id : popMovie.id,
        title : popMovie.title,
        release_year : popMovie.release_date.substring(0, 4),
        release_date : popMovie.release_date,
        runtime : null,
        genres : null,
        overview : popMovie.overview,
        vote_average : popMovie.vote_average,
        poster_path : Constants.apiPosterUrl + popMovie.poster_path
      }))
    );
    this.page++;
  }
}
