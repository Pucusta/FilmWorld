import { Component, Input, OnInit } from '@angular/core';
import { Constants } from '../../services/constants';

/* This class is a component that is used to display the details of a person */
@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  @Input('person-details') person: any;

  placeholder: string = Constants.personPlacholderPath;
  apiProfilUrl: string = Constants.apiProfileUrl;

  constructor() { }

  ngOnInit(): void {
  }

}