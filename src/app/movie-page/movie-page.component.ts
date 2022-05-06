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
    this.movieService.getPopularMovies(this.page).subscribe({
      next: data => data.results.forEach(popMovie => this.popularMovies.push({
        id : popMovie.id,
        title : popMovie.title,
        release_year : popMovie.release_date.substring(0, 4),
        release_date : popMovie.release_date,
        runtime : null,
        genres : null,
        overview : popMovie.overview,
        vote_average : popMovie.vote_average,
        poster_path : popMovie.poster_path == null ? "./assets/images/poster_placeholder.png" : Constants.apiPosterUrl + popMovie.poster_path
      })),
      error: (error) => console.error(error)
    });
    this.page++;
  }
}
