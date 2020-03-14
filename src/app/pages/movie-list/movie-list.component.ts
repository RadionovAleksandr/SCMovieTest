import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';

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
    constructor(private movieService: MovieService) { }

    getMovies(page) {
        this.movieService.getMovies(page)
            .subscribe(movies => {
                this.movies = movies.results;
                // this.movieService.movies = movies.results;
                localStorage.setItem('page', page);
            });
    }

    ngOnInit() {
        this.local = localStorage;
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

    // openCard(id: number) {
    //     console.log(' id ' + id);
    // };

    // goToPostsPage() {
    //     this.router.navigate(['/'])
    // };
}
