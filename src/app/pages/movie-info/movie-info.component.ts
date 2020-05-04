import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../shared/movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../shared/movie.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-info',
    templateUrl: './movie-info.component.html',
    styleUrls: ['./movie-info.component.scss']
})

export class MovieInfoComponent implements OnInit, OnDestroy {

    movie: Movie;
    moviesSimilar: Movie[];
    bookmarks: Movie[] = [];
    isBookmark: boolean;
    gSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.gSub = this.route.params
            .subscribe((params: Params) => {           // todo: use rxjs optimizaion subscribe
                this.movieService.getMovie(params.id)
                    .subscribe(movie => {
                        this.movie = movie;
                    });
                this.movieService.getSimilar(params.id)
                    .subscribe(movies => {
                        this.moviesSimilar = movies;
                    });
                this.setBookmarkCard(+params.id);
            });
    }
    addBookmarks(movie: Movie) {
        this.movieService.addBookmark(movie);
        this.setBookmarkCard(movie.id);
    }

    setBookmarkCard(id: number) {
        this.isBookmark = this.movieService.inBookmarks(id);
    }

    toggleBookmark(movie, bool) {
        bool ? this.movieService.addBookmark(movie)
        : this.movieService.removeBookmark(movie);
    }

    checkBookmark(movie) {
        return this.movieService.inBookmarks(movie.id);
    }

    ngOnDestroy() {
        if (this.gSub) {
            this.gSub.unsubscribe();
        }
    }
}
