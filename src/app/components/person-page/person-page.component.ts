import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.type';
import { Result } from '../../models/result.type';
import { ObservableFunctions } from '../../services/functions';
import { PersonService } from '../../services/person.service';

/* This class is a component that displays a list of popular people */
@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {

  popularPeople: Observable<Result<Person>>;
  page: number = 1;

  constructor(private personService: PersonService, private observableFunctions: ObservableFunctions) { }

  /**
   * We're calling the getPopularPeople() function from the personService and assigning the result to
   * the popularPeople variable
   */
  ngOnInit(): void {
    this.popularPeople = this.personService.getPopularPeople(this.page);
    this.page++;
  }

  /**
   * We're taking the results of the first observable, and concatenating the results of the second
   * observable to it
   */
  loadPeople() {
    this.popularPeople = this.observableFunctions.concatObservableResults(this.popularPeople, this.personService.getPopularPeople(this.page));
    this.page++;
  }

}