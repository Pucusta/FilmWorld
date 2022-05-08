import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Result } from "../models/result.type";

@Injectable()
export class ObservableFunctions {

    concatObservableResults<T>(result1: Observable<Result<T>>, result2: Observable<Result<T>>) : Observable<Result<T>>{
        let mereged : Result<T> = {page: null, results: [], total_pages: null,  total_results: null};
        result1.subscribe(result => result.results.forEach(obj => mereged.results.push(obj)));
        result2.subscribe(result => result.results.forEach(obj => mereged.results.push(obj)));
        return of(mereged);
    }
}