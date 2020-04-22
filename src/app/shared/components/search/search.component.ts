import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

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
    }

    onSearch() {
        console.log(' Start onSearch ');
        const inputs = fromEvent(document.querySelector(".search"), 'input');
        const result = inputs.pipe(debounce(() => interval(this.delay)));
        result.subscribe(x => {
            this.onChange.emit(this.searchString); // стреляем событием
        });
    }
}
