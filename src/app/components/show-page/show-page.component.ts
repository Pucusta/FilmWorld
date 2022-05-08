import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.type';
import { Show } from '../../models/show.type';
import { ObservableFunctions } from '../../services/functions';
import { ShowService } from '../../services/show.service';

/* This class is a component that displays a list of popular shows */
@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {

  popularShows: Observable<Result<Show>>;
  page: number = 1;

  constructor(private showService: ShowService, private observableFunctions: ObservableFunctions) { }

  /**
   * We're calling the getPopularShows() function from the showService and assigning the result to the
   * popularShows variable
   */
  ngOnInit(): void {
    this.popularShows = this.showService.getPopularShows(this.page);
    this.page++;
  }

  /**
   * We're taking the results of the first observable and concatenating it with the results of the
   * second observable
   */
  loadShows(){
    this.popularShows = this.observableFunctions.concatObservableResults(this.popularShows, this.showService.getPopularShows(this.page));
    this.page++;
  }

}