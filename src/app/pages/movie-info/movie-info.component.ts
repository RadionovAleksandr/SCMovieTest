import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../shared/movie.service';

@Component({
    selector: 'app-movie-info',
    templateUrl: './movie-info.component.html',
    styleUrls: ['./movie-info.component.css']
})

export class MovieInfoComponent implements OnInit {

    movie;
    moviesSimilar;
    bookmarks: Movie[] = [];

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                this.movieService.getMoviesDetails(params.id)
                    .subscribe(movie => {
                        this.movie = movie;
                    });

                this.movieService.getSimilar(params.id)
                    .subscribe(movies => {
                        this.moviesSimilar = movies;
                    });
            });
    }
    addBookmarks(movie: Movie) {
        this.movieService.addBookmark(movie);
    }
}
