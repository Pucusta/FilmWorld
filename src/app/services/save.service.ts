import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Movie } from "../models/movie.type";
import { Person } from "../models/person.type";
import { Show } from "../models/show.type";

@Injectable()
export class SaveService{

    constructor(){
    }

    saveMovie(movie : Observable<Movie>){
        movie.subscribe(m => {
            let movies = this.getMovies();
            movies.push(m);
            localStorage.setItem('savedMovies', JSON.stringify(movies));
        });
    }

    saveShow(show : Observable<Show>){
        show.subscribe(s => {
            let shows = this.getShows();
            shows.push(s);
            localStorage.setItem('savedShows', JSON.stringify(shows));
        });
    }

    savePerson(person : Observable<Person>){
        person.subscribe(p => {
            let people = this.getPeople();
            people.push(p);
            localStorage.setItem('savedPeople', JSON.stringify(people));
        });
    }

    removeMovie(id : number){
        let movies = this.getMovies();
        let index = movies.findIndex(function (movie) {return movie.id == id});
        if (index != -1) {
            movies.splice(index, 1);
            localStorage.setItem('savedMovies', JSON.stringify(movies));
        }
    }

    removeShow(id : number){
        let shows = this.getShows();
        let index = shows.findIndex(function (show) {return show.id == id});
        if (index != -1) {
            shows.splice(index);
            localStorage.setItem('savedShows', JSON.stringify(shows));
        };
    }

    removePerson(id : number){
        let people = this.getPeople();
        let index = people.findIndex(function (person) {return person.id == id});
        if (index != -1) {
            people.splice(index);
            localStorage.setItem('savedPeople', JSON.stringify(people));
        }
    }

    getMoviesObservable() : Observable<Movie[]> {
        let movies : Movie[];
        let moviesJson = localStorage.getItem('savedMovies');
        if (moviesJson == null) {
            movies = [];
        } else {
            movies = JSON.parse(moviesJson);
        }
        return of(movies);
    }

    getShowsObservable() : Observable<Show[]> {
        let shows : Show[];
        let showsJson = localStorage.getItem('savedShows');
        if (showsJson == null) {
            shows = [];
        } else {
            shows = JSON.parse(showsJson);
        } 
        return of(shows);
    }

    getPeopleObservable() : Observable<Person[]> {
        let people : Person[];
        let peopleJson = localStorage.getItem('savedPeople');
        if (peopleJson == null) {
            people = [];
        } else {
            people = JSON.parse(peopleJson);
        } 
        return of(people);
    }

    getMovies() : Movie[] {
        let movies : Movie[];
        let moviesJson = localStorage.getItem('savedMovies');
        if (moviesJson == null) {
            movies = [];
        } else {
            movies = JSON.parse(moviesJson);
        }
        return movies;
    }

    getShows() : Show[] {
        let shows : Show[];
        let showsJson = localStorage.getItem('savedShows');
        if (showsJson == null) {
            shows = [];
        } else {
            shows = JSON.parse(showsJson);
        } 
        return shows;
    }

    getPeople() : Person[] {
        let people : Person[];
        let peopleJson = localStorage.getItem('savedPeople');
        if (peopleJson == null) {
            people = [];
        } else {
            people = JSON.parse(peopleJson);
        } 
        return people;
    }

    isMovieSaved(id : number) : boolean{
        let movies = this.getMovies();
        let index = movies.findIndex(movie => movie.id == id);
        if (index == -1) return false;
        else return true;
    }

    isShowSaved(id : number) : boolean{
        let shows = this.getShows();
        let index = shows.findIndex(show => show.id == id);
        if (index == -1) return false;
        else return true;
    }

    isPersonSaved(id : number) : boolean{
        let people = this.getPeople();
        let index = people.findIndex(person => person.id == id);
        if (index == -1) return false;
        else return true;
    }
}