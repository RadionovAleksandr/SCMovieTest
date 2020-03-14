import { Component, Input, Output } from '@angular/core';
import { MovieService } from '../../movie.service';
import { MovieListComponent } from 'src/app/pages/movie-list/movie-list.component';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination-component.html'
})

export class NgbdPaginationComponent {
    constructor(
        private movieService: MovieService,
        private movieListComponent: MovieListComponent
        ) { }
    @Input() pages: number;
    @Input() pageSize: number;
    @Input() totalResults: number;
    @Output() pageChange;

    maxSize = 6;

    page = 4;

    getPage(pageChange) {
        this.movieService.getMovies(pageChange)
        .subscribe((movies) => {
            console.log(movies);
            this.movieListComponent.movies = movies.results;
            this.movieService.setLocal(pageChange);
            // localStorage.setItem('page', pageChange);
        });
    }
}
