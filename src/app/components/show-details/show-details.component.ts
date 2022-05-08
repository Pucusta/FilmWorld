import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../services/constants';

/* This class is a component that displays the details of a show */
@Component({
  selector: 'show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  @Input('show-details') show: any;

  placeholder: string = Constants.posterPlaceholderPath;
  apiPosterUrl: string = Constants.apiPosterUrl;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * We're using the router to navigate to the show page, but we're using skipLocationChange to prevent
   * the browser from updating the URL. Then we're using the router to navigate to the show page again,
   * but this time we're passing in the URL we want to navigate to. This helps realoding the page with the new data
   */
  navigateToShow(){
    let url = '/show/' + this.show.id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([url]);
    });
  }

}