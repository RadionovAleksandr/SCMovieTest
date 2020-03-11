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
    objGenres = this.movieService.objGenres;
    constructor(
        private router: Router,
        private movieService: MovieService) { }

    ngOnInit() {
        this.movieService.getGenre()
            .subscribe(res => {
                this.genres = res.genres;
                this.genres.forEach(genre => {
                    this.movieService.objGenres[genre.id] = genre.name;
                });
            });

        console.log(' this.objGenres ', this.objGenres);
        this.movieService.getMovies()
            .subscribe(movies => {
                this.movies = movies.results;
                for (var i = 0; i <= movies.total_pages; ++i) {
                    this.pages.push(i);
                }
                console.log(this.pages.length);
                console.log(this.pages[0])
            });
    };



    // openCard(id: number) {
    //     console.log(' id ' + id);
    // };

    // goToPostsPage() {
    //     this.router.navigate(['/'])
    // };
}
