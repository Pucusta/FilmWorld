import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.type';
import { Season, Show } from '../../models/show.type';
import { Constants } from '../../services/constants';
import { ObservableFunctions } from '../../services/functions';
import { SaveService } from '../../services/save.service';
import { ShowService } from '../../services/show.service';

/* It's a component that displays the details of a show */
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

  /**
   * We subscribe to the activated route's params, which gives us the showId, and then we use that
   * showId to get the show, the seasons, and the similar shows
   */
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

  /**
   * We're using the concatObservableResults function to concatenate the results of the getSimilarShows
   * function to the similarShows array
   */
  loadShows(){
    this.similarShows = this.observableFunctions.concatObservableResults(this.similarShows, this.showService.getSimilarShows(this.showId, this.page));
    this.page++;
  }

  /**
   * If the show is saved, change the text of the save button to 'Saved', otherwise change it to 'Save'
   */
  checkIfSaved(){
    this.saved = this.saveService.isShowSaved(this.showId);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  /**
   * If the show is saved, remove it from the saved shows list, otherwise add it to the saved shows
   * list
   * @param element - The element that was clicked.
   */
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