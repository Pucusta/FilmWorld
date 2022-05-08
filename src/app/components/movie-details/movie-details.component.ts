import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../services/constants';

/* This class is a component that displays the details of a movie */
@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input('movie-details') movie: any;

  placeholder: string = Constants.posterPlaceholderPath;
  apiPosterUrl: string = Constants.apiPosterUrl;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * We're using the router to navigate to the movie page, but we're using skipLocationChange to
   * prevent the browser from updating the URL. Then we're using the router to navigate to the movie
   * page again, but this time we're passing in the URL. This helps reloading the page with new data.
   */
  navigateToMovie(){
    let url = '/movie/' + this.movie.id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([url]);
    });
  }

}
