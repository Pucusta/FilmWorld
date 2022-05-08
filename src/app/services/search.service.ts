import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Movie } from "../models/movie.type";
import { Person } from "../models/person.type";
import { Result } from "../models/result.type";
import { Show } from "../models/show.type";
import { Constants } from "./constants";

@Injectable()
export class SearchService{

    constructor(private http: HttpClient ) {
    }

    getMovieSearch(searchTerm: string, page: number) : Observable<Result<Movie>>{
        let url = ''.concat(Constants.apiUrl, '/search/movie?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<Result<Movie>>(url);
    }

    getShowSearch(searchTerm: string, page: number) : Observable<Result<Show>>{
        let url = ''.concat(Constants.apiUrl, '/search/tv?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<Result<Show>>(url);
    }

    getPersonSearch(searchTerm: string, page: number) : Observable<Result<Person>>{
        let url = ''.concat(Constants.apiUrl, '/search/person?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<Result<Person>>(url);
    }
}