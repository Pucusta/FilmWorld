import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Credits } from "../models/credits.type";
import { Person, PersonCast } from "../models/person.type";
import { Result } from "../models/result.type";
import { Constants } from "./constants";

/* It's a service that makes HTTP requests to the TMDb API to get information about people */
@Injectable()
export class PersonService{
    
    constructor(private http: HttpClient ) {
    }

    /**
     * It returns an observable of type Result<Person> which is a class that contains a list of Person
     * objects and a page number
     * @param {number} page - The page number to load.
     * @returns Observable<Result<Person>>
     */
    getPopularPeople(page: number) : Observable<Result<Person>> {
        let url = ''.concat(Constants.apiUrl, '/person/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Person>>(url);
    }

    /**
     * This function takes a number as a parameter and returns an Observable of type Person
     * @param {number} id - number - The id of the person you want to get.
     * @returns Observable<Person>
     */
    getPerson(id: number) : Observable<Person> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Person>(url);
    }

    /**
     * This function returns an observable of type Credits<PersonCast> which is a generic type
     * @param {number} id - number - The id of the person you want to get the credits for.
     * @returns Observable<Credits<PersonCast>>
     */
    getMovieCredits(id: number) : Observable<Credits<PersonCast>> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '/movie_credits?api_key=', Constants.apiKey);
        return this.http.get<Credits<PersonCast>>(url);
    }

    /**
     * This function returns an observable of type Credits<PersonCast> which is a generic type
     * @param {number} id - number - The id of the person you want to get the credits for.
     * @returns Observable<Credits<PersonCast>>
     */
    getShowCredits(id: number) : Observable<Credits<PersonCast>> {
        let url = ''.concat(Constants.apiUrl, '/person/', id.toString(), '/tv_credits?api_key=', Constants.apiKey);
        return this.http.get<Credits<PersonCast>>(url);
    }
}