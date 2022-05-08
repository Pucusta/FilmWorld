import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Result } from "../models/result.type";
import { Season, Show } from "../models/show.type";
import { Constants } from "./constants";

/* It's a service that makes HTTP requests to the TMDB API to get information about shows */
@Injectable()
export class ShowService{
    
    constructor(private http: HttpClient ) {
    }

    /**
     * It returns an observable of type Result<Show> which is a generic type that contains a list of
     * Show objects and a page number
     * @param {number} page - The page number to load. Each page will contain 20 results.
     * @returns Observable<Result<Show>>
     */
    getPopularShows(page: number) : Observable<Result<Show>>{
        let url = ''.concat(Constants.apiUrl, '/tv/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Show>>(url)
    }

    /**
     * It takes in a show id and a page number and returns an observable of a Result object containing
     * a list of shows
     * @param {number} id - The id of the show you want to get similar shows for.
     * @param {number} page - The page number to load.
     * @returns Observable<Result<Show>>
     */
    getSimilarShows(id: number, page: number) : Observable<Result<Show>>{
        let url = ''.concat(Constants.apiUrl, '/tv/', id.toString(), '/similar?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Show>>(url);
    }

    /**
     * This function takes in a number, and returns an Observable of type Show
     * @param {number} id - number - The id of the show you want to get
     * @returns Observable<Show>
     */
    getShow(id: number) : Observable<Show>{
        let url = ''.concat(Constants.apiUrl, '/tv/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Show>(url);
    }

   /**
    * This function takes in a showId and a seasonNumber and returns an observable of type Season
    * @param {number} showId - The id of the show you want to get the season for.
    * @param {number} seasonNumber - The season number you want to get.
    * @returns An observable of type Season.
    */
    getSeason(showId: number, seasonNumber: number) : Observable<Season>{
        let url = ''.concat(Constants.apiUrl, '/tv/', showId.toString(), '/season/', seasonNumber.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Season>(url);
    }
}