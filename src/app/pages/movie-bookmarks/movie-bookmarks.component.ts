import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Movie, MovieService } from '../../shared/movie.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-bookmarks',
    templateUrl: './movie-bookmarks.component.html',
    styleUrls: ['./movie-bookmarks.component.scss']
})

export class MovieBookmarksComponent implements OnInit, OnDestroy{

    page: number = 1;
    movies: Movie[];
    load: boolean;
    pageSize = 20;
    totalResults: number;
    gSub: Subscription;
    cSub: Subscription;

    constructor(
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.load = true;
        this.gSub = this.movieService.getBookmarks()
            .subscribe(movies => {
                this.pagination(movies);
            });
    }

    removeBookmark(movie) {
        this.movieService.removeBookmark(movie);
        this.movies = this.movies.filter(movieItem => movie.id !== movieItem.id);
    }

    pagination(movies) {
        this.totalResults = movies.length;
        this.load = false;
        let boxMovies = [];
        for (let i = this.page * 20 - 20; (this.page * 20 - 20 <= i) && (i < this.page * 20); i++) {
            if (movies[i]) {
                boxMovies.push(movies[i]);
            }
        }
        this.movies = boxMovies;
    }

    changePageList(pageChange) {
        this.page = pageChange;
        this.cSub = this.movieService.getBookmarks()
            .subscribe(movies => {
                this.pagination(movies);
            });
    }

    ngOnDestroy() {
        if (this.gSub) {
            this.gSub.unsubscribe();
        }
        if (this.cSub) {
            this.cSub.unsubscribe();
        }
    }
}