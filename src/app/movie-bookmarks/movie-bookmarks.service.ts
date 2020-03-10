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

    constructor(private http: HttpClient) { }

    // this method save object movie
    // addBookmarks(movieBookmarks) {
    //     if(this.movieBookmarks.includes(movieBookmarks) === false) {
    //         this.movieBookmarks.push(movieBookmarks);
    //     }
    //     console.log('service BM this.movieBookmarks ', this.movieBookmarks)
    // }

    // this method save propherty id object movie
    addBookmarks(movieBookmarks) {
        if (this.movieBookmarksId.includes(movieBookmarks.id) === false) {
            this.movieBookmarksId.push(movieBookmarks.id);
        }
        console.log('service BM this.movieBookmarks ', this.movieBookmarksId)
    }

    getBookmarks(id: number): Observable<Movie> {
        return this.http.get<Movie>('https://api.themoviedb.org/3/movie/' + id + '?api_key=07223f1ae4f3155a8e7eadc55a5431eb')
    }

    delBookmarks(movie) {
        console.log('movie ' + movie.id);

        console.log(' this.movieBookmarks.length', this.movieBookmarks.length);
        for (var i = 0; i < this.movieBookmarksId.length; i++) {
            console.log(' delBookmarks for2');
            if (this.movieBookmarks[i]) {
                if (this.movieBookmarks[i].id === movie.id) {
                    this.movieBookmarks.splice(i, 1);
                    i--;
                }
            }
            console.log(' this.movieBookmarksId[i] ', this.movieBookmarksId[i]);
            console.log(' movie.id ', movie.id);
            if (this.movieBookmarksId[i] === movie.id) {
                this.movieBookmarksId.splice(i, 1);
                i--;
            }
        }
        console.log(' movieBookmarks ', this.movieBookmarks);
        console.log(' movieBookmarksId ', this.movieBookmarksId);
    }
    // todo implement localStorage using 
    //https://developers.themoviedb.org/4/list/create-list
}
