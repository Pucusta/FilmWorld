import { Component, OnInit } from '@angular/core';
import { Show } from '../models/show.type';
import { Constants } from '../services/constants';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {

  popularShows: Show[] = [];
  page: number = 1;

  constructor(private showService: ShowService) { }

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(){
    this.showService.getPopularShows(this.page).subscribe({
      next: data => data.results.forEach(show => this.popularShows.push({
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
    this.page++;
  }

}
