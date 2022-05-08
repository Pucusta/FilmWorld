import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.type';
import { Show } from '../../models/show.type';
import { ObservableFunctions } from '../../services/functions';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {

  popularShows: Observable<Result<Show>>;
  page: number = 1;

  constructor(private showService: ShowService, private observableFunctions: ObservableFunctions) { }

  ngOnInit(): void {
    this.popularShows = this.showService.getPopularShows(this.page);
    this.page++;
  }

  loadShows(){
    this.popularShows = this.observableFunctions.concatObservableResults(this.popularShows, this.showService.getPopularShows(this.page));
    this.page++;
  }

}
