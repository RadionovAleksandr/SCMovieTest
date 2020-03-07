import { Component, OnInit } from '@angular/core';

import { MovieInfoService } from './movie-info.service';
import { observable } from 'rxjs';
import { Movie } from '../movie.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-movie-info',
    templateUrl: './movie-info.component.html',
    styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

    // id: number;
    movie: void;
    constructor(private route: ActivatedRoute,
        private movieInfoService: MovieInfoService) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                console.log('params ', params);
                this.movieInfoService.getMoviesDetails(params.id)
                .subscribe(movie => {
                    console.log(movie)
                    this.movie = movie
                });
            })
    }
}
