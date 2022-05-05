import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {

  @Input('episode-details') episode: any;

  constructor() { }

  ngOnInit(): void {
  }

}
