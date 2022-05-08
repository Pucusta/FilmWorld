import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../services/constants';

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

  navigateToMovie(){
    let url = '/movie/' + this.movie.id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([url]);
    });
  }

}
