import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../movie.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

    search: string = ''
    movies: Movie[];
    constructor(
        private router: Router,
        private movieService: MovieService) { }

    ngOnInit() {
        console.log(' movie List ');
        this.movieService.getMovies()
            .subscribe(movies => {
                console.log(movies)
                this.movies = movies.results
            });
    };

    openCard(id: number) {
        console.log(' id ' + id);
    };

    goToPostsPage() {
        this.router.navigate(['/'])
    };
}
