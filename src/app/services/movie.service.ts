import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Credits } from "../models/credits.type";
import { Movie, MovieCast } from "../models/movie.type";
import { Result } from "../models/result.type";
import { Constants } from "./constants";

@Injectable()
export class MovieService{

    constructor(private http: HttpClient ) {
    }

    getPopularMovies(page: number) : Observable<Result<Movie>>{
        let url = ''.concat(Constants.apiUrl, '/movie/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Movie>>(url);
    }

    getMovie(id: number) : Observable<Movie>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Movie>(url);
    }

    getSimilarMovies(id: number, page: number) : Observable<Result<Movie>>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '/similar?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Movie>>(url);
    }

    getCredits(id: number) : Observable<Credits<MovieCast>>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '/credits?api_key=', Constants.apiKey);
        return this.http.get<Credits<MovieCast>>(url);
    }
}