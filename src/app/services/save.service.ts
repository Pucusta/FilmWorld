import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.type";
import { Person } from "../models/person.type";
import { Show } from "../models/show.type";

@Injectable()
export class SaveService{

    constructor(){
    }

    saveMovie(movie : Movie){
        let movies = this.getMovies();
        movies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
    }

    saveShow(show : Show){
        let shows = this.getShows();
        shows.push(show);
        localStorage.setItem('savedShows', JSON.stringify(shows));
    }

    savePerson(person : Person){
        let people = this.getPeople();
        people.push(person);
        localStorage.setItem('savedPeople', JSON.stringify(people));
    }

    removeMovie(movieToRemove : Movie){
        let movies = this.getMovies();
        let index = movies.findIndex(function (movie) {return movie.id === movieToRemove.id});
        if (index != -1) {
            movies.splice(index, 1);
            localStorage.setItem('savedMovies', JSON.stringify(movies));
        }
    }

    removeShow(showToRemove : Show){
        let shows = this.getShows();
        let index = shows.findIndex(function (show) {return show.id === showToRemove.id});
        if (index != -1) {
            shows.splice(index);
            localStorage.setItem('savedShows', JSON.stringify(shows));
        };
    }

    removePerson(personToRemove : Person){
        let people = this.getPeople();
        let index = people.findIndex(function (person) {return person.id === personToRemove.id});
        if (index != -1) {
            people.splice(index);
            localStorage.setItem('savedPeople', JSON.stringify(people));
        }
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

    isMovieSaved(searchedMovie : Movie) : boolean{
        let movies = this.getMovies();
        let index = movies.findIndex(movie => movie.id === searchedMovie.id);
        if (index == -1) return false;
        else return true;
    }

    isShowSaved(searchedShow : Show) : boolean{
        let shows = this.getShows();
        let index = shows.findIndex(show => show.id === searchedShow.id);
        if (index == -1) return false;
        else return true;
    }

    isPersonSaved(searchedPerson : Person) : boolean{
        let people = this.getPeople();
        let index = people.findIndex(person => person.id === searchedPerson.id);
        if (index == -1) return false;
        else return true;
    }
}