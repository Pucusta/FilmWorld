import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  @Input('show-details') show: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToMovie(){
    let url = '/show/' + this.show.id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([url]);
    });
  }

}
