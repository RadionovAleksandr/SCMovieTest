import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
    pageSize = 20;
    movies: Movie[];
    genres: Genre[];
    totalResults: number;
    initialList: Movie[];
    gSub: Subscription;
    cSub: Subscription;
    load: boolean;

    constructor(
        private movieService: MovieService,
    ) { }

    getMovies(page?) {
        this.load = true;
        this.gSub = this.movieService.getMovies(page)
            .subscribe(res => {
                console.log(res);
                this.movies = [...res.movies];
                this.initialList = [...res.movies];
                this.totalResults = res.totalResults;
                this.load = false;
            });
    }

    onSearch(str) {
        console.log('START onSearch ');
        if (!str) {
            this.movies = this.initialList;
            return;
        }
        this.cSub = this.movieService.getSearchMovie(str)
            .subscribe(movies => {
                this.movies = movies;
            });
    }

    checkBookmark(movie) {
        return this.movieService.inBookmarks(movie.id);
    }
    toggleBookmark(movie, bool) {
        console.log(' START toggleBookmark ');
        if (bool) {
            this.movieService.addBookmark(movie);
        } else {
            this.movieService.removeBookmark(movie);
        }
    }

    changePageList(pageChange) {
        this.getMovies(pageChange);
    }

    ngOnInit() {
        this.getMovies();
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