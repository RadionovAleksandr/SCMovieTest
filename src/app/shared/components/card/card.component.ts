import { Component, OnInit, Input } from '@angular/core';
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
    @Input() objGenres;
    @Input() remove;

    local;
    faBookmark = faBookmark;
    faBookmarkFill = faBookmarkFill;
    constructor(private sanitizer: DomSanitizer) { }

    getPosterSrc(width, path, den) {
        return this.sanitizer.bypassSecurityTrustUrl(`https://image.tmdb.org/t/p/w${width}${path} ${den}x`);
    }

    ngOnInit(): void {
        this.local = localStorage;
    }
}
