import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
    movies: Movie[];
    genres: Genre[];
    countPages: number;
    pageSize: number;
    totalResults: number;
    initialList: Movie[];
    page: number;
    constructor(
        private movieService: MovieService,
    ) { }

    getMovies() {
        this.movieService.getMovies()
            .subscribe(movies => {
                this.movies = [...movies];
                this.initialList = [...movies];
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
        if (bool) {
            this.movieService.addBookmark(movie);
        } else {
            this.movieService.removeBookmark(movie);
        }
    }

    
    changePageList(pageChange) {
        // this.movieService.getMovies(pageChange)
        // .subscribe((movies) => {
            console.log(pageChange);
            // this.movieListComponent.movies = movies;
            // localStorage.setItem('page', pageChange);
        // });
    }

    ngOnInit() {
        this.getMovies();
    }
}