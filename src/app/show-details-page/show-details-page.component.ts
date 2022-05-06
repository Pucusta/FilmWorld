import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Episode, SeasonDetails, Show, ShowDetails } from '../models/show.type';
import { Constants } from '../services/constants';
import { SaveService } from '../services/save.service';
import { ShowService } from '../services/show.service';

@Component({
  selector: 'app-show-details-page',
  templateUrl: './show-details-page.component.html',
  styleUrls: ['./show-details-page.component.css']
})
export class ShowDetailsPageComponent implements OnInit {

  show: Show;
  showId: number;
  similarShows: Show[] = [];
  seasons: SeasonDetails[] = [];
  page: number = 1;
  saved: boolean;

  constructor(private showService: ShowService, private saveService : SaveService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let seasonsLength = 0;
    this.activatedRoute.params.subscribe((params: Params) => this.showId = params.id);
    this.showService.getShow(this.showId).subscribe({
      next: (data : ShowDetails) => this.show = {
        id: data.id,
        name: data.name,
        first_air_date: data.first_air_date,
        genres: data.genres,
        vote_average: data.vote_average,
        overview: data.overview,
        num_of_episodes: data.number_of_episodes,
        num_of_seasons: data.number_of_seasons,
        poster_path: Constants.apiPosterUrl + data.poster_path,
        seasons: data.seasons
      },
      complete: () => {
        this.checkIfSaved();
        this.show.seasons.forEach(
          season => this.showService.getSeason(this.showId, season.season_number).subscribe({
            next: (data : SeasonDetails) => seasonsLength = this.seasons.push(data),
            complete: () => this.seasons[seasonsLength - 1].episodes.forEach(
              episode => episode.still_path = Constants.apiStillUrl + episode.still_path
            )
          })
        );}
    });
    this.loadShows();
  }

  loadShows(){
    this.showService.getSimilarShows(this.showId, this.page).subscribe(
      data => data.results.forEach(show => this.similarShows.push({
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
    this.page++;
  }

  checkIfSaved(){
    this.saved = this.saveService.isShowSaved(this.show);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  save(element) {
    if (this.saved) {
      this.saveService.removeShow(this.show);
      element.textContent = 'Save';
    } else {
      this.saveService.saveShow(this.show);
      element.textContent = 'Saved';
    }
    this.saved = !this.saved;
  }
}