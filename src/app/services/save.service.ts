import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Movie } from "../models/movie.type";
import { Person } from "../models/person.type";
import { Show } from "../models/show.type";

/* It's a service that saves and removes movies, shows, and people from local storage */
@Injectable()
export class SaveService{

    constructor(){
    }

    /**
     * We subscribe to the movie observable, and when we get the movie, we push it into the array of
     * movies, and then we save the array of movies to local storage
     * @param movie - Observable<Movie>
     */
    saveMovie(movie : Observable<Movie>){
        movie.subscribe(m => {
            let movies = this.getMovies();
            movies.push(m);
            localStorage.setItem('savedMovies', JSON.stringify(movies));
        });
    }

    /**
     * We subscribe to the observable, and when the observable emits a value, we push that value into
     * an array of shows, and then we save that array of shows to local storage
     * @param show - Observable<Show>
     */
    saveShow(show : Observable<Show>){
        show.subscribe(s => {
            let shows = this.getShows();
            shows.push(s);
            localStorage.setItem('savedShows', JSON.stringify(shows));
        });
    }

    /**
     * When the person observable emits a person, push that person into the array of people, and save
     * the array of people to local storage.
     * @param person - Observable<Person>
     */
    savePerson(person : Observable<Person>){
        person.subscribe(p => {
            let people = this.getPeople();
            people.push(p);
            localStorage.setItem('savedPeople', JSON.stringify(people));
        });
    }

    /**
     * It takes an id as a parameter, finds the movie with that id in the array of movies, and removes
     * it from the array
     * @param {number} id - number - the id of the movie to be removed
     * @returns the index of the movie with the id that was passed in.
     */
    removeMovie(id : number){
        let movies = this.getMovies();
        let index = movies.findIndex(function (movie) {return movie.id == id});
        if (index != -1) {
            movies.splice(index, 1);
            localStorage.setItem('savedMovies', JSON.stringify(movies));
        }
    }

    /**
     * It removes a show from the savedShows array in localStorage
     * @param {number} id - the id of the show to be removed
     * @returns the index of the show with the id that was passed in.
     */
    removeShow(id : number){
        let shows = this.getShows();
        let index = shows.findIndex(function (show) {return show.id == id});
        if (index != -1) {
            shows.splice(index);
            localStorage.setItem('savedShows', JSON.stringify(shows));
        };
    }

    /**
     * It takes an id, finds the person with that id, and removes them from the list of people
     * @param {number} id - number - the id of the person to be removed
     * @returns the index of the person with the id that was passed in.
     */
    removePerson(id : number){
        let people = this.getPeople();
        let index = people.findIndex(function (person) {return person.id == id});
        if (index != -1) {
            people.splice(index);
            localStorage.setItem('savedPeople', JSON.stringify(people));
        }
    }

    /**
     * It returns an Observable of an array of Movie objects
     * @returns An observable of an array of movies.
     */
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

    /**
     * It returns an observable of an array of shows
     * @returns An observable of an array of Show objects.
     */
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

    /**
     * It returns an observable of an array of people
     * @returns An observable of an array of Person objects.
     */
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

    /**
     * If there are no movies in local storage, return an empty array. Otherwise, return the movies
     * from local storage
     * @returns An array of movies.
     */
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

    /**
     * If there are no saved shows, return an empty array. Otherwise, return the saved shows
     * @returns An array of Show objects.
     */
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

    /**
     * If there are no people in local storage, return an empty array. Otherwise, return the people
     * from local storage
     * @returns An array of Person objects.
     */
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

    /**
     * If the movie is not in the array, return false, else return true
     * @param {number} id - number - The id of the movie you want to check if it's saved.
     * @returns a boolean value.
     */
    isMovieSaved(id : number) : boolean{
        let movies = this.getMovies();
        let index = movies.findIndex(movie => movie.id == id);
        if (index == -1) return false;
        else return true;
    }

    /**
     * If the show is in the array, return true, else return false
     * @param {number} id - the id of the show you want to check
     * @returns A boolean value.
     */
    isShowSaved(id : number) : boolean{
        let shows = this.getShows();
        let index = shows.findIndex(show => show.id == id);
        if (index == -1) return false;
        else return true;
    }

    /**
     * If the person with the given id is in the people array, return true, otherwise return false
     * @param {number} id - number - the id of the person you want to check
     * @returns A boolean value.
     */
    isPersonSaved(id : number) : boolean{
        let people = this.getPeople();
        let index = people.findIndex(person => person.id == id);
        if (index == -1) return false;
        else return true;
    }
}