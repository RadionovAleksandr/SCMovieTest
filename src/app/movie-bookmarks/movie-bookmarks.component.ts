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

    movies: Movie[] = [];
    arrid: number[] = [];

    constructor(
        private router: Router,
        private movieBookmarkService: MovieBookmarksService
    ) { }

    ngOnInit(): void {
        // this.movies = this.movieBookmarkService.movieBookmarks;
        console.log(" localStorage.getItem('bookmarks') ", localStorage.getItem('bookmarks'));
        // if (localStorage) {
        //     this.getBookmarks((localStorage.getItem('bookmarks')).split(','));
        // } else {
            this.arrid = this.movieBookmarkService.movieBookmarksId;
            console.log('this.arrid) ', this.arrid);
            this.getBookmarks(this.arrid);
        // }
    }

    delBookmarks(movie) {
        this.movieBookmarkService.delBookmarks(movie);
        this.movies = this.movieBookmarkService.movieBookmarks;
        this.getBookmarks(this.arrid);
        // console.log('this.arrid ',this.movieBookmarkService.movieBookmarksId);

        console.log('this.movies ', this.movies)
    }

    getBookmarks(arrid) {
        if (localStorage) {
            arrid = (localStorage.getItem('bookmarks')).split(',');
        }
        console.log(' arrid ', arrid);
        arrid.forEach(id => {
            this.movieBookmarkService.getBookmarks(id)
                .subscribe(movie => {
                    this.movies.push(movie);
                });
        })
    }

    // goToPostsPage() {
    //     this.router.navigate(['/bookmarks'])
    // }
}
