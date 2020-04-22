import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkFill } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {
    @Input() movie: Movie;
    @Input() bookmarked: boolean;
    @Output() toggleBookmark = new EventEmitter();

    faBookmark = faBookmark;
    faBookmarkFill = faBookmarkFill;
    constructor(private sanitizer: DomSanitizer) { }

    getPosterSrc(width, path, den) {
        return this.sanitizer.bypassSecurityTrustUrl(`https://image.tmdb.org/t/p/w${width}${path} ${den}x`);
    }

    toggle(event) {
        console.log(' event ', event);
        this.toggleBookmark.emit(!this.bookmarked);
        event.stopPropagation();
    }

    ngOnInit(): void {
    }
}
