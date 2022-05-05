import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  @Input('person-details') person: any;

  constructor() { }

  ngOnInit(): void {
  }

}
