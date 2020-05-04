import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, interval, Subject, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    searchString: string = "";
    @Output() onChange = new EventEmitter();
    @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
    delay: number = 1000;
    pSub: Subscription;
    
    constructor() { }

    ngOnInit() {
        const inputs = fromEvent( this.searchInput.nativeElement , 'input');
        const result = inputs.pipe(debounce(() => interval(this.delay)));
        this.pSub = result.subscribe(x => {
            this.onChange.emit(this.searchString); // стреляем событием
        });
    }

    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }
}