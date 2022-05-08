import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Movie } from "../models/movie.type";
import { Person } from "../models/person.type";
import { Result } from "../models/result.type";
import { Show } from "../models/show.type";
import { Constants } from "./constants";

/* It's a service that makes HTTP requests to the TMDb API to search for movies, shows, and people */
@Injectable()
export class SearchService{

    constructor(private http: HttpClient ) {
    }

    /**
     * It returns an observable of type Result<Movie> which is a generic type that contains a list of
     * Movie objects and a page number
     * @param {string} searchTerm - The search term to search for.
     * @param {number} page - The page number of the results to show.
     * @returns An observable of type Result<Movie>
     */
    getMovieSearch(searchTerm: string, page: number) : Observable<Result<Movie>>{
        let url = ''.concat(Constants.apiUrl, '/search/movie?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<Result<Movie>>(url);
    }

    /**
     * It returns an observable of type Result<Show> which is a generic type that contains a list of
     * Show objects and a total number of results
     * @param {string} searchTerm - The term to search for.
     * @param {number} page - The page number of the results to show.
     * @returns Observable<Result<Show>>
     */
    getShowSearch(searchTerm: string, page: number) : Observable<Result<Show>>{
        let url = ''.concat(Constants.apiUrl, '/search/tv?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<Result<Show>>(url);
    }

    /**
     * It returns an observable of type Result<Person> which is a generic type that takes a generic
     * type
     * @param {string} searchTerm - The search term to search for.
     * @param {number} page - The page number of the results to show.
     * @returns Observable<Result<Person>>
     */
    getPersonSearch(searchTerm: string, page: number) : Observable<Result<Person>>{
        let url = ''.concat(Constants.apiUrl, '/search/person?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<Result<Person>>(url);
    }
}