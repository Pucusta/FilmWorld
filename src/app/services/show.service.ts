import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Episode, SeasonDetails, ShowDetails, ShowResult } from "../models/show.type";
import { Constants } from "./constants";

@Injectable()
export class ShowService{
    
    constructor(private http: HttpClient ) {
    }

    getPopularShows(page: number) : Observable<ShowResult>{
        let url = ''.concat(Constants.apiUrl, '/tv/popular?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<ShowResult>(url);
    }

    getShow(id: number) : Observable<ShowDetails>{
        let url = ''.concat(Constants.apiUrl, '/tv/', id.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<ShowDetails>(url);
    }

    getSimilarShows(id: number, page: number) : Observable<ShowResult>{
        let url = ''.concat(Constants.apiUrl, '/tv/', id.toString(), '/similar?api_key=', Constants.apiKey, '&page=', page.toString());
        return this.http.get<ShowResult>(url);
    }

    getSeason(showId: number, seasonNumber: number) : Observable<SeasonDetails>{
        let url = ''.concat(Constants.apiUrl, '/tv/', showId.toString(), '/season/', seasonNumber.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<SeasonDetails>(url);
    }

    getEpisode(showId: number, seasonNumber: number, episodeNumber: number) : Observable<Episode>{
        let url = ''.concat(Constants.apiUrl, '/tv/', showId.toString(), '/season/', seasonNumber.toString(), '/episode/', episodeNumber.toString(), '?api_key=', Constants.apiKey);
        return this.http.get<Episode>(url);
    }
}