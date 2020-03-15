import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../../movie.service';
import { MovieListComponent } from 'src/app/pages/movie-list/movie-list.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchString: string = "";
    @Output() onChange = new EventEmitter();

    constructor() { }

    onSearch() {
        this.onChange.emit(this.searchString); // стреляем событием
    }
}
