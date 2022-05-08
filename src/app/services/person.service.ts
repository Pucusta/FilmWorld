import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Credits } from "../models/credits.type";
import { Person, PersonCast } from "../models/person.type";
import { Result } from "../models/result.type";
import { Constants } from "./constants";

@Injectable()
export class PersonService{
    
    constructor(private http: HttpClient ) {
    }

    getPopularPeople(page: number) : Observable<Result<Person>> {
        let url = ''.concat(Constants.apiUrl, '/person/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Person>>(url);
    }

    getPerson(id: number) : Observable<Person> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Person>(url);
    }

    getMovieCredits(id: number) : Observable<Credits<PersonCast>> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '/movie_credits?api_key=', Constants.apiKey);
        return this.http.get<Credits<PersonCast>>(url);
    }

    getShowCredits(id: number) : Observable<Credits<PersonCast>> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '/tv_credits?api_key=', Constants.apiKey);
        return this.http.get<Credits<PersonCast>>(url);
    }
}