import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.type';
import { Result } from '../../models/result.type';
import { ObservableFunctions } from '../../services/functions';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {

  popularPeople: Observable<Result<Person>>;
  page: number = 1;

  constructor(private personService: PersonService, private observableFunctions: ObservableFunctions) { }

  ngOnInit(): void {
    this.popularPeople = this.personService.getPopularPeople(this.page);
    this.page++;
  }

  loadPeople() {
    this.popularPeople = this.observableFunctions.concatObservableResults(this.popularPeople, this.personService.getPopularPeople(this.page));
    this.page++;
  }

}
