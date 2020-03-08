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

    constructor(
        private router: Router,
        private movieBookmarkService: MovieBookmarksService
        ) { }

    ngOnInit(): void {
        this.movies = this.movieBookmarkService.movieBookmarks
    }

    delite(movie) {
        this.movieBookmarkService.delite(movie);
    }


    // goToPostsPage() {
    //     this.router.navigate(['/bookmarks'])
    // }
}
