import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MovieResult } from "../models/movie.type";
import { PersonResult } from "../models/person.type";
import { ShowResult } from "../models/show.type";
import { Constants } from "./constants";

@Injectable()
export class SearchService{

    constructor(private http: HttpClient ) {
    }

    getMovieSearch(searchTerm: string, page: number) : Observable<MovieResult>{
        let url = ''.concat(Constants.apiUrl, '/search/movie?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<MovieResult>(url);
    }

    getShowSearch(searchTerm: string, page: number) : Observable<ShowResult>{
        let url = ''.concat(Constants.apiUrl, '/search/tv?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<ShowResult>(url);
    }

    getPersonSearch(searchTerm: string, page: number) : Observable<PersonResult>{
        let url = ''.concat(Constants.apiUrl, '/search/person?api_key=', Constants.apiKey, '&query=', searchTerm, '&page=', page.toString());
        return this.http.get<PersonResult>(url);
    }
}