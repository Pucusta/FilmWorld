import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Credits } from '../../models/credits.type';
import { Person, PersonCast } from '../../models/person.type';
import { Constants } from '../../services/constants';
import { ObservableFunctions } from '../../services/functions';
import { PersonService } from '../../services/person.service';
import { SaveService } from '../../services/save.service';

/* It's a component that displays the details of a person */
@Component({
  selector: 'app-person-details-page',
  templateUrl: './person-details-page.component.html',
  styleUrls: ['./person-details-page.component.css']
})
export class PersonDetailsPageComponent implements OnInit {

  person: Observable<Person>;
  personId: number;
  movies: Observable<Credits<PersonCast>>;
  shows: Observable<Credits<PersonCast>>;
  saved: boolean;
  placeholder: string = Constants.personPlacholderPath;
  apiProfileUrl: string = Constants.apiProfileUrl;

  constructor(
    private personService: PersonService,
    private saveService : SaveService,
    private activatedRoute: ActivatedRoute,
    private observableFunctions: ObservableFunctions) { }

  /**
   * We subscribe to the activatedRoute's params observable, and when the params change, we update the
   * personId and check if the person is saved
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.personId = params.id;
      this.checkIfSaved();
    });
    this.person = this.personService.getPerson(this.personId);
    this.movies = this.personService.getMovieCredits(this.personId);
    this.shows = this.personService.getShowCredits(this.personId);
  }

  /**
   * If the person is saved, change the text of the save button to "Saved". If the person is not saved,
   * change the text of the save button to "Save"
   */
  checkIfSaved(){
    this.saved = this.saveService.isPersonSaved(this.personId);
    let saveButton = document.getElementById('saveButton');
    if (this.saved) saveButton.textContent = 'Saved';
    else document.getElementById('saveButton').textContent = 'Save';
  }

  /**
   * If the person is saved, remove them from the saved list, otherwise add them to the saved list
   * @param element - The element that was clicked.
   */
  save(element) {
    if (this.saved) {
      this.saveService.removePerson(this.personId);
      element.textContent = 'Save';
    } else {
      this.saveService.savePerson(this.person);
      element.textContent = 'Saved';
    }
    this.saved = !this.saved;
  }
}