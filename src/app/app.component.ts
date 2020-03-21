import { Component, OnInit } from '@angular/core';
import { MovieService } from './shared/movie.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    items = [];
    pageOfItems: Array<any>;

    constructor() { }

    ngOnInit() {
        // an example array of 150 items to be paged
        this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    }

    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
}
