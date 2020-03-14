import { Component, OnInit, Input } from '@angular/core';
import { Movie, MovieService } from '../../shared/movie.service';
// import { MovieBookmarksService } from './movie-bookmarks.service';

@Component({
    selector: 'app-movie-bookmarks',
    templateUrl: './movie-bookmarks.component.html',
    styleUrls: ['./movie-bookmarks.component.css']
})

export class MovieBookmarksComponent implements OnInit {

    movies: Movie[];
    arrid: number[] = [];

    constructor(
        private movieService: MovieService,
        // private movieBookmarkService: MovieBookmarksService
    ) { }

    ngOnInit(): void {
        if(this.movieService.movieBookmarks.length !== 0) {
            this.movies = this.movieService.movieBookmarks;
        } else {
            this.getBookmarks((localStorage.getItem('bookmarks')).split(','));
            this.movies = this.movieService.movieBookmarks;
        }
    }

    delBookmarks(movie) {
        this.movieService.delBookmarks(movie);
        this.movies = this.movieService.movieBookmarks;
        console.log('this.movies ', this.movies);
    }

    getBookmarks(arrid) {
        if (localStorage) {
            arrid = (localStorage.getItem('bookmarks')).split(',');
        }

        arrid.forEach(id => {
            this.movieService.getBookmarks(id)
                .subscribe(movie => {
                    this.movieService.addBookmarks(movie);
                });
        })
    }

    // goToPostsPage() {
    //     this.router.navigate(['/bookmarks'])
    // }
}
