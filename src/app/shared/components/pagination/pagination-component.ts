import { Component, Input, Output } from '@angular/core';
import { MovieService } from '../../movie.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination-component.html'
})

export class NgbdPaginationComponent {
    constructor(private movieService: MovieService) { }
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
            localStorage.setItem('page', pageChange);
        });
    }
}
