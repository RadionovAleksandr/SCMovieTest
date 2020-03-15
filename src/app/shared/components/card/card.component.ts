import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../movie.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})


export class CardComponent implements OnInit {
    @Input() movie: Movie;
    @Input() objGenres;

    local;
    constructor() { }

    ngOnInit(): void {
        this.local = localStorage;
    }
}
