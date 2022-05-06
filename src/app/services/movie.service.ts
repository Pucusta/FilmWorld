import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MovieCredits, MovieDetails, MovieResult } from "../models/movie.type";
import { Constants } from "./constants";

@Injectable()
export class MovieService{

    constructor(private http: HttpClient ) {
    }

    getPopularMovies(page: number) : Observable<MovieResult>{
        let url = ''.concat(Constants.apiUrl, '/movie/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<MovieResult>(url);
    }

    getMovie(id: number) : Observable<MovieDetails>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<MovieDetails>(url);
    }

    getSimilarMovies(id: number, page: number) : Observable<MovieResult>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '/similar?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<MovieResult>(url);
    }

    getCredits(id: number) : Observable<MovieCredits>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '/credits?api_key=', Constants.apiKey);
        return this.http.get<MovieCredits>(url);
    }
}