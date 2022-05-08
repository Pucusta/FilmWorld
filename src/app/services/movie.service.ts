import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Credits } from "../models/credits.type";
import { Movie, MovieCast } from "../models/movie.type";
import { Result } from "../models/result.type";
import { Constants } from "./constants";

/* It contains functions that make HTTP requests to the MovieDB API and return Observables of the
results */
@Injectable()
export class MovieService{

    constructor(private http: HttpClient ) {
    }

    /**
     * It returns an Observable of type Result<Movie> which is a generic type that contains a list of
     * Movie objects and a page number
     * @param {number} page - The page number to load. Each page will contain 20 results.
     * @returns Observable<Result<Movie>>
     */
    getPopularMovies(page: number) : Observable<Result<Movie>>{
        let url = ''.concat(Constants.apiUrl, '/movie/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Movie>>(url);
    }

    /**
     * This function takes a movie id as a parameter and returns an observable of type Movie
     * @param {number} id - The id of the movie you want to get.
     * @returns Observable<Movie>
     */
    getMovie(id: number) : Observable<Movie>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Movie>(url);
    }

    /**
     * It takes a movie id and a page number as parameters, and returns an observable of a Result
     * object containing a list of Movie objects
     * @param {number} id - The id of the movie you want to get similar movies for.
     * @param {number} page - The page number to load.
     * @returns An observable of type Result<Movie>
     */
    getSimilarMovies(id: number, page: number) : Observable<Result<Movie>>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '/similar?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Movie>>(url);
    }

    /**
     * This function takes in a movie id and returns an observable of type Credits<MovieCast>
     * @param {number} id - The id of the movie you want to get the credits for.
     * @returns Observable<Credits<MovieCast>>
     */
    getCredits(id: number) : Observable<Credits<MovieCast>>{
        let url = ''.concat(Constants.apiUrl, '/movie/', id.toString(), '/credits?api_key=', Constants.apiKey);
        return this.http.get<Credits<MovieCast>>(url);
    }
}