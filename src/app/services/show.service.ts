import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Result } from "../models/result.type";
import { Season, Show } from "../models/show.type";
import { Constants } from "./constants";

@Injectable()
export class ShowService{
    
    constructor(private http: HttpClient ) {
    }

    getPopularShows(page: number) : Observable<Result<Show>>{
        let url = ''.concat(Constants.apiUrl, '/tv/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Show>>(url)
    }

    getSimilarShows(id: number, page: number) : Observable<Result<Show>>{
        let url = ''.concat(Constants.apiUrl, '/tv/', id.toString(), '/similar?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<Result<Show>>(url);
    }

    getShow(id: number) : Observable<Show>{
        let url = ''.concat(Constants.apiUrl, '/tv/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Show>(url);
    }

    getSeason(showId: number, seasonNumber: number) : Observable<Season>{
        let url = ''.concat(Constants.apiUrl, '/tv/', showId.toString(), '/season/', seasonNumber.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Season>(url);
    }

    /*
    getEpisode(showId: number, seasonNumber: number, episodeNumber: number) : Observable<Episode>{
        let url = ''.concat(Constants.apiUrl, '/tv/', showId.toString(), '/season/', seasonNumber.toString(), '/episode/', episodeNumber.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Episode>(url);
    }
    */
}