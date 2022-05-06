import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.type';
import { Constants } from '../services/constants';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {

  popularPeople: Person[] = [];
  page: number = 1;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getPopularPeople(this.page).subscribe({
      next: data => data.results.forEach(person => this.popularPeople.push({
        id: person.id,
        name: person.name,
        gender: person.gender == 1 ? 'woman' : 'man',
        birthday: null,
        biography: null,
        place_of_birth: null,
        profile_path: person.profile_path == null ? "./assets/images/person_placeholder.jpeg" : Constants.apiProfileUrl + person.profile_path
      })),
      error: (error) => console.error(error)
    });
    this.page++;
  }

}
