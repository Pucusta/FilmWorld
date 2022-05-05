import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersonCredits, PersonDetails, PersonResult } from "../models/person.type";
import { Constants } from "./constants";

@Injectable()
export class PersonService{
    
    constructor(private http: HttpClient ) {
    }

    getPopularPeople(page: number) : Observable<PersonResult> {
        let url = ''.concat(Constants.apiUrl, '/person/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<PersonResult>(url);
    }

    getPerson(id: number) : Observable<PersonDetails> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<PersonDetails>(url);
    }

    getMovieCredits(id: number) : Observable<PersonCredits> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '/movie_credits?api_key=', Constants.apiKey);
        return this.http.get<PersonCredits>(url);
    }

    getShowCredits(id: number) : Observable<PersonCredits> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '/tv_credits?api_key=', Constants.apiKey);
        return this.http.get<PersonCredits>(url);
    }
}