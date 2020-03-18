import { Component, OnInit, Input } from '@angular/core';
import { Movie, MovieService } from '../../shared/movie.service';

@Component({
    selector: 'app-movie-bookmarks',
    templateUrl: './movie-bookmarks.component.html',
    styleUrls: ['./movie-bookmarks.component.css']
})

export class MovieBookmarksComponent implements OnInit {

    movies: Movie[];

    constructor(
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.movieService.getBookmarks()
        .subscribe(movies => {
            this.movies = movies;
        });
    }

    removeBookmark(movie) {
        this.movieService.removeBookmark(movie);
        this.movies = this.movies.filter(movieItem => movie.id !== movieItem.id);
    }
}
