import { Component, Input, Output } from '@angular/core';
import { MovieService } from '../../movie.service';
import { MovieListComponent } from 'src/app/pages/movie-list/movie-list.component';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination-component.html',
    styleUrls: ['./pagination-component.scss']
})

export class NgbdPaginationComponent {
    @Output() pageChange;

    constructor(
        private movieService: MovieService,
        private movieListComponent: MovieListComponent
        ) {}
    // @Input() pages: number;
    // @Input() pageSize: number;
    // @Input() totalResults: number;
    // pages = 20;
    // pageSize = 20;
    // totalResults = 1200;
    // page = 1;
    // maxSize = 6;

        getPage(pageChange) {
            this.movieService.getMovies(pageChange)
            .subscribe((movies) => {
                console.log(movies);
                this.movieListComponent.movies = movies;
                // localStorage.setItem('page', pageChange);
            });
        }
}
