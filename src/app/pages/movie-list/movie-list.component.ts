import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
    pageSize = 20;
    movies: Movie[];
    genres: Genre[];
    totalResults: number;
    initialList: Movie[];
    load: boolean;

    constructor(
        private movieService: MovieService,
    ) { }

    getMovies(page?) {
        this.load = true;
        this.movieService.getMovies(page)
            .subscribe(res => {
                console.log(res);
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
        this.movieService.getSearchMovie(str)
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
}