import { Component, OnInit } from '@angular/core';

import { MovieInfoService } from './movie-info.service';

import { observable } from 'rxjs';
import { Movie, Genre } from '../movie.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieBookmarksService } from '../movie-bookmarks/movie-bookmarks.service'
import { MovieService } from '../movie.service'

@Component({
    selector: 'app-movie-info',
    templateUrl: './movie-info.component.html',
    styleUrls: ['./movie-info.component.css']
})

export class MovieInfoComponent implements OnInit {

    // id: number;
    movie;//: void;
    moviesSImilar;

    bookmarks: Movie[] = [];

    constructor(
        private route: ActivatedRoute,
        private movieInfoService: MovieInfoService,
        private movieBookmarksService: MovieBookmarksService,
    ) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                this.movieInfoService.getMoviesDetails(params.id)
                    .subscribe(movie => {
                        this.movie = movie
                        console.log(movie)
                    });

                this.movieInfoService.getMoviesSimilar(params.id)
                    .subscribe(movies => {
                        this.moviesSImilar = movies.results
                        console.log('this.movieSImilar ', this.moviesSImilar)
                    });
            })
    }

    addBookmarks(movie: Movie) {
        this.movieBookmarksService.addBookmarks(movie);
    }
}
