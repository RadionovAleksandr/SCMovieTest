import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../movie.service';
import { MovieListComponent } from 'src/app/pages/movie-list/movie-list.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    // styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    @Input() search: string;
    constructor(
        private movieService: MovieService,
        private movieListComponent: MovieListComponent
    ) { }

    getSearchMovie(str) {
        this.movieService.getSearchMovie(str)
            .subscribe(movies => {
                this.movieListComponent.movies = movies.results;
            });
    }
    ngOnInit(): void { }
}
