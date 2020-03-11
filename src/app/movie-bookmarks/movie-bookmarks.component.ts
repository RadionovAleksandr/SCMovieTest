import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../movie.service';
import { MovieBookmarksService } from './movie-bookmarks.service';

@Component({
    selector: 'app-movie-bookmarks',
    templateUrl: './movie-bookmarks.component.html',
    styleUrls: ['./movie-bookmarks.component.css']
})

export class MovieBookmarksComponent implements OnInit {

    movies: Movie[];
    arrid: number[] = [];

    constructor(
        private router: Router,
        private movieBookmarkService: MovieBookmarksService
    ) { }

    ngOnInit(): void {
        if(this.movieBookmarkService.movieBookmarks.length !== 0) {
            console.log(' достаю из service');
            this.movies = this.movieBookmarkService.movieBookmarks;
        } else {
            console.log(' достаю из localStorage c id: ', (localStorage.getItem('bookmarks')).split(','));
            this.getBookmarks((localStorage.getItem('bookmarks')).split(','));
            this.movies = this.movieBookmarkService.movieBookmarks;
        }
    }

    delBookmarks(movie) {
        this.movieBookmarkService.delBookmarks(movie);
        this.movies = this.movieBookmarkService.movieBookmarks;
        console.log('this.movies ', this.movies);
    }

    getBookmarks(arrid) {
        console.log(this.movies);
        if (localStorage) {
            arrid = (localStorage.getItem('bookmarks')).split(',');
        }
        console.log(' arrid ', arrid);
        arrid.forEach(id => {
            this.movieBookmarkService.getBookmarks(id)
                .subscribe(movie => {
                    this.movieBookmarkService.addBookmarks(movie);
                });
        })
    }

    // goToPostsPage() {
    //     this.router.navigate(['/bookmarks'])
    // }
}
