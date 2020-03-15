import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

    search: string;
    movies: Movie[];
    // countPages: number[];
    genres: Genre[];
    // pages = [];
    countPages: number;
    pageSize: number;
    totalResults: number;
    page: number;
    objGenres = this.movieService.objGenres;
    local;
    constructor(
        private movieService: MovieService,
        // private searchComponent: SearchComponent
    ) { }

    getMovies(page) {
        // if (this.searchComponent.searchString === null && this.searchComponent.inputValue === 'окно поиска') {
        this.movieService.getMovies(page)
            .subscribe(movies => {
                this.movies = movies.results;
                this.movieService.setLocal(page);
                // localStorage.setItem('page', page);
            });
        // } else {
        //     this.getSearchMovie(this.searchComponent.inputValue)
        // }
    }

    onSearch(evt) {
        console.log(evt);
        this.movieService.getSearchMovie(evt)
            .subscribe(movies => {
                this.movies = movies.results;
            });
    }

    ngOnInit() {
        // this.local = localStorage;
        this.local = this.movieService.getlocal();
        this.movieService.getGenre()
            .subscribe(res => {
                this.genres = res.genres;
                this.genres.forEach(genre => {
                    this.movieService.objGenres[genre.id] = genre.name;
                });
            });
        localStorage.getItem('page') ? this.page = Number(localStorage.getItem('page')) : this.page = 1;

        this.movieService.getMovies(this.page)
            .subscribe(movies => {
                this.movies = movies.results;
                this.totalResults = movies.total_results;
                this.countPages = movies.total_pages;
                this.pageSize = movies.results.length;
            });
    }
}