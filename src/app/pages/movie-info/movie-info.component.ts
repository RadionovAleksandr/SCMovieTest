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

    movie;//: void;
    moviesSImilar;


    bookmarks: Movie[] = [];

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.moviesSImilar = true;

        this.route.params
            .subscribe((params: Params) => {
                this.movieService.getMoviesDetails(params.id)
                    .subscribe(movie => {
                        this.movie = movie;
                    });

                this.movieService.getMoviesSimilar(params.id)
                    .subscribe(movies => {
                        if (movies.total_results !== 0) {
                            this.moviesSImilar = movies.results;
                            // this.isViewSimilar = true;
                        } else {
                            console.log(222222);
                            // this.isViewSimilar = false;
                        }
                    });
            });
    }
    addBookmarks(movie: Movie) {
        this.movieService.addBookmarks(movie);
    }
}
