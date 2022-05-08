import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../services/constants';

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

  navigateToShow(){
    let url = '/show/' + this.show.id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([url]);
    });
  }

}
