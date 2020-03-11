import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie } from '../movie.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MovieBookmarksService {

    movieBookmarks: Movie[] = [];  //new Map
    movieBookmarksId: number[] = [];
    arrId;
    movies;



    constructor(private http: HttpClient) { }

    // this method save object movie and save propherty id object movie
    addBookmarks(movie) {
        if (this.movieBookmarksId.includes(movie.id) === false) {
  
            this.movieBookmarksId.push(movie.id);
            localStorage.setItem('bookmarks', this.movieBookmarksId.join());
            this.movieBookmarks.push(movie);
        }
        movie.bookmark = true;
        console.log(' movie.bookmark ', movie.bookmark);
    }

    getBookmarks(id): Observable<Movie> {
        return this.http.get<Movie>('https://api.themoviedb.org/3/movie/' + id + '?api_key=07223f1ae4f3155a8e7eadc55a5431eb')
    }

    setMovie(movie: Movie) {
        this.movieBookmarks.push(movie);
    }

    delBookmarks(movie) {
        // console.log('movie ' + movie.id);
        // console.log(' this.movieBookmarksId.length', this.movieBookmarksId.length);
        // console.log('START delBookmarks this.movieBookmarks: ', this.movieBookmarks);
        movie.bookmark = false;
        console.log(' movie.bookmark ', movie.bookmark);
        // if (localStorage.getItem('bookmarks')) {
        this.arrId = (localStorage.getItem('bookmarks')).split(',');
        // }
        console.log(' arrId ', this.arrId);

        for (var i = 0; i < this.movieBookmarksId.length; i++) {
            console.log('i ', i);
            if (this.movieBookmarks[i]) {
                if (this.movieBookmarks[i].id === movie.id) {
                    this.movieBookmarks.splice(i, 1);
                    // i--;
                }
            }

            // if (this.movieBookmarksId[i] === movie.id) {
            //     this.movieBookmarksId.splice(i, 1);
            //     // i--;
            // }

            if (this.arrId[i] == movie.id) {
                this.arrId.splice(i, 1);
                i--;
            }
        }
        this.movieBookmarksId = this.arrId;

        // console.log('after del ', this.arrId);
        // console.log(' this.movieBookmarks: ',  this.movieBookmarks);
        localStorage.clear();
        localStorage.setItem('bookmarks', this.arrId)


        // console.log(" after del localStorage.getItem('bookmarks') ", localStorage.getItem('bookmarks'))
        // console.log(' movieBookmarks ', this.movieBookmarks);
        // console.log(' movieBookmarksId ', this.movieBookmarksId);
    }
    // todo implement localStorage using 
    //https://developers.themoviedb.org/4/list/create-list
}
