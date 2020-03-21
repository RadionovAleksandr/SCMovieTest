import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../movie.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})


export class CardComponent implements OnInit {
    @Input() movie: Movie;
    @Input() objGenres;
    @Input() remove;

    local;
    constructor( ) { }

    ngOnInit(): void {
        this.local = localStorage;
    }
}
