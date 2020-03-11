import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, Genre } from '../movie.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

    search: string = ''
    movies: Movie[];
    countPages: number[];
    genres: Genre[];
    pages = [];
    page: number = 1
    objGenres = this.movieService.objGenres;
    constructor(
        private movieService: MovieService) { }

    getMovies(page) {
        this.movieService.getMovies(page)
            .subscribe(movies => {
                this.movies = movies.results;
                localStorage.setItem('page', page)
            });
    }

    ngOnInit() {
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

                for (var i = 0; i <= movies.total_pages; ++i) {
                    this.pages.push(i);
                }
            });
    };

    // openCard(id: number) {
    //     console.log(' id ' + id);
    // };

    // goToPostsPage() {
    //     this.router.navigate(['/'])
    // };
}
