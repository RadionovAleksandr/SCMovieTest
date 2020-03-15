import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, Genre } from '../../shared/movie.service';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
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
                this.movies = [...movies.results];
                this.initialList = [...movies.results];
            });
    }

    onSearch(str) {
        if (!str) {
            this.movies = this.initialList;
            return;
        }
        this.movieService.getSearchMovie(str)
            .subscribe(movies => {
                this.movies = movies.results;
            });
    }

    ngOnInit() {
        // this.movieService.getGenre()
        //     .subscribe(res => {
        //         this.genres = res.genres;
        //         this.genres.forEach(genre => {
        //             this.movieService.objGenres[genre.id] = genre.name;
        //         });
        //     });
        this.getMovies();
    }
}