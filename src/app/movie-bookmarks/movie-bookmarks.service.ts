import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie } from '../movie.service';

@Injectable({
    providedIn: 'root'
})

export class MovieBookmarksService {

    movieBookmarks: Movie[] = [];

    constructor(private http: HttpClient) { }
    addBookmarks(movieBookmarks) {
        this.movieBookmarks.push(movieBookmarks);
        console.log('service BM this.movieBookmarks ', this.movieBookmarks)
    }

    delite(movie) {
        for (var i = 0; i < this.movieBookmarks.length; i++) {
            if (this.movieBookmarks[i].id === movie.id) {
                this.movieBookmarks.splice(i, 1);
                i--;
            }
        }
        
        console.log(' movie BM ', movie)
        // return this.movieBookmarks.filter((item) => {
        //     item.id !== movie.id;
        //     console.log(item.id !== movie.id)
        //     console.log('delite', this.movieBookmarks)
        // })
        // console.log('movie.id', movie.id);
        // console.log('item.id', item.id)
    }
}
