import { Component, Input, OnInit } from '@angular/core';
import { Constants } from '../../services/constants';

/* This class is a component that displays the details of a single episode */
@Component({
  selector: 'episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {

  @Input('episode-details') episode: any;

  placeholder: string = Constants.episodePlaceholderPath;
  apiStillUrl: string = Constants.apiStillUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
