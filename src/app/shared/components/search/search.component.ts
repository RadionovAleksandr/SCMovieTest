import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fromEvent, interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { throttle } from 'rxjs/operators';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchString: string = "";
    @Output() onChange = new EventEmitter();

    delay: number = 1000;
    constructor() { }

    ngOnInit() {
        const inputs = fromEvent(document.querySelector(".search"), 'input');
        const result = inputs.pipe(debounce(() => interval(this.delay)));
        result.subscribe(x => {
            this.onChange.emit(this.searchString); // стреляем событием
        });
    }
}