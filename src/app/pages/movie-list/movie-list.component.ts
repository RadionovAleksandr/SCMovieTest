import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    getMoviesSub: Subscription;
    searchSub: Subscription;
    load: boolean;
    str: string;
    search$: Subject<string>;
    page = 1;

    constructor(
        private movieService: MovieService,
    ) { }

    getMovies(page?) {
        this.load = true;
        this.getMoviesSub = this.movieService.getMovies(page)
            .subscribe(res => {
                this.movies = [...res.movies];
                this.initialList = [...res.movies];
                this.totalResults = res.totalResults;
                this.load = false;
            });
    }

    onSearch(str) {
        if (!str) {
            this.movies = this.initialList;
            return;
        }
        this.movieService.getSearchMovie(str);
        this.search$.next(str);
    }

    checkBookmark(movie) {
        return this.movieService.inBookmarks(movie.id);
    }
    toggleBookmark(movie, bool) {
        if (bool) {
            this.movieService.addBookmark(movie);
        } else {
            this.movieService.removeBookmark(movie);
        }
    }

    changePageList(pageChange) {
        this.page = pageChange;
        this.getMovies(pageChange);
    }

    ngOnInit() {
        this.getMovies();

        this.search$ = new Subject();
        this.searchSub = this.search$.pipe(
            switchMap(searchString => this.movieService.getSearchMovie(searchString))
        ).subscribe(movies => {
            console.log(movies)
            this.movies = [...movies];
            this.totalResults = movies.length;
        });
    }

    ngOnDestroy() {
        if (this.getMoviesSub) {
            this.getMoviesSub.unsubscribe();
        }
        if (this.searchSub) {
            this.searchSub.unsubscribe();
        }
    }
}