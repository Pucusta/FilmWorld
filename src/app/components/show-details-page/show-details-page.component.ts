import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.type';
import { Season, Show } from '../../models/show.type';
import { Constants } from '../../services/constants';
import { ObservableFunctions } from '../../services/functions';
import { SaveService } from '../../services/save.service';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-details-page',
  templateUrl: './show-details-page.component.html',
  styleUrls: ['./show-details-page.component.css']
})
export class ShowDetailsPageComponent implements OnInit {

  show: Observable<Show>;
  showId: number;
  seasons: Observable<Season>[] = [];
  similarShows: Observable<Result<Show>>;
  page: number = 1;
  saved: boolean;
  placeholder: string = Constants.posterPlaceholderPath;
  apiPosterUrl: string = Constants.apiPosterUrl;

  constructor(
    private showService: ShowService,
    private saveService : SaveService,
    private activatedRoute: ActivatedRoute,
    private observableFunctions: ObservableFunctions) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.showId = params.id;
      this.checkIfSaved();
    });
    this.show = this.showService.getShow(this.showId);
    this.show.subscribe(show => show.seasons.forEach(
      season => this.seasons.push(this.showService.getSeason(this.showId, season.season_number))
    ));
    this.similarShows = this.showService.getSimilarShows(this.showId, this.page);
    this.page++
  }

  loadShows(){
    this.similarShows = this.observableFunctions.concatObservableResults(this.similarShows, this.showService.getSimilarShows(this.showId, this.page));
    this.page++;
  }

  checkIfSaved(){
    this.saved = this.saveService.isShowSaved(this.showId);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  save(element) {
    if (this.saved) {
      this.saveService.removeShow(this.showId);
      element.textContent = 'Save';
    } else {
      this.saveService.saveShow(this.show);
      element.textContent = 'Saved';
    }
    this.saved = !this.saved;
  }
}

/*
ngOnInit(): void {
    let seasonsLength = 0;
    this.activatedRoute.params.subscribe((params: Params) => this.showId = params.id);
    this.showService.getShow(this.showId).subscribe({
      next: (data : Show) => this.show = {
        id: data.id,
        name: data.name,
        first_air_date: data.first_air_date,
        genres: data.genres,
        vote_average: data.vote_average,
        overview: data.overview,
        num_of_episodes: data.number_of_episodes,
        num_of_seasons: data.number_of_seasons,
        poster_path: data.poster_path == null ? "./assets/images/poster_placeholder.png" : Constants.apiPosterUrl + data.poster_path,
        seasons: data.seasons
      },
      error: (error) => console.error(error),
      complete: () => {
        this.checkIfSaved();
        this.show.seasons.forEach(
          season => this.showService.getSeason(this.showId, season.season_number).subscribe({
            next: (data : Season) => seasonsLength = this.seasons.push(data),
            complete: () => this.seasons[seasonsLength - 1].episodes.forEach(
              episode => episode.still_path = episode.still_path == null ? "./assets/images/episode_placeholder.jpeg" : Constants.apiStillUrl + episode.still_path
            )
          })
        );}
    });
    this.loadShows();
  }

  loadShows(){
    this.showService.getSimilarShows(this.showId, this.page).subscribe({
      next: data => data.results.forEach(show => this.similarShows.push({
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
*/