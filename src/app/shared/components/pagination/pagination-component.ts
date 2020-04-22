import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination-component.html',
    styleUrls: ['./pagination-component.scss']
})

export class AppPaginationComponent {

    constructor() {}
    @Output() pageChange = new EventEmitter();
    @Input() pageSize: number;
    @Input() totalResults: number;
    @Input() page = 1;

    maxSize = 6;

    bootstrapPaginationChange($event) {
        console.log($event);
        this.pageChange.emit($event); // стреляем событием
    }
}


