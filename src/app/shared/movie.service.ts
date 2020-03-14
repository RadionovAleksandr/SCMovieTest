import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
export interface Movie {
    popularity: number;
    vote_count: number;
    video?: boolean;
    poster_path: string;
    id: number;
    adult?: false;
    backdrop_path: string;
    original_language?: string;
    original_title?: string;
    genre_ids: [number];
    title: string;
    vote_average: number;
    overview: string;
    release_date: void;  // hz object date ?
    genres: [string];
    bookmark: boolean;
}

export interface ResponceMovieNow {
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}
export interface ResponceGenre {
    genres: Genre[];
}

export interface MovieSimiral {
    results: void[];
    total_results: number;
}

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    movies: Movie[];
    objGenres = {};

    movieBookmarks: Movie[] = [];
    movieBookmarksId: number[] = [];
    arrId;

    constructor(private http: HttpClient) { }

    getMovies(page): Observable<ResponceMovieNow> {
        return this.http.get<ResponceMovieNow>
            (`https://api.themoviedb.org/3/movie/now_playing?api_key=07223f1ae4f3155a8e7eadc55a5431eb&language=en-US&page=${page}`);
    }

    getBookmarks(id): Observable<Movie> {
        return this.http.get<Movie>('https://api.themoviedb.org/3/movie/' + id + '?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    getGenre(): Observable<ResponceGenre> {
        return this.http.get<ResponceGenre>('https://api.themoviedb.org/3/genre/movie/list?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    getSearchMovie(search: string): Observable<ResponceMovieNow> {
        return this.http.get<ResponceMovieNow>
        (`https://api.themoviedb.org/3/search/movie?api_key=07223f1ae4f3155a8e7eadc55a5431eb&query=${search}`);
    }

    // this method save object movie and save propherty id object movie
    addBookmarks(movie) {
        if (this.movieBookmarksId.includes(movie.id) === false) {
            this.movieBookmarksId.push(movie.id);
            localStorage.setItem('bookmarks', this.movieBookmarksId.join());
            this.movieBookmarks.push(movie);
        }
    }

    delBookmarks(movie) {
        movie.bookmark = false;
        this.arrId = (localStorage.getItem('bookmarks')).split(',');
        for (let i = 0; i < this.movieBookmarksId.length; i++) {
            if (this.movieBookmarks[i]) {
                if (this.movieBookmarks[i].id === movie.id) {
                    this.movieBookmarks.splice(i, 1);
                }
            }
            if (this.arrId[i] === movie.id) {
                this.arrId.splice(i, 1);
                i--;
            }
        }
        this.movieBookmarksId = this.arrId;
        localStorage.clear();
        localStorage.setItem('bookmarks', this.arrId);
    }
    /*
    todo implement localStorage using
    https://developers.themoviedb.org/4/list/create-list
    */

    getMoviesDetails(id: number): Observable<void> {
        return this.http.get<void>('https://api.themoviedb.org/3/movie/' + id + '?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    getMoviesSimilar(movieID: number): Observable<MovieSimiral> {
        return this.http.get<MovieSimiral>('https://api.themoviedb.org/3/movie/' + movieID +
            '/similar?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    getlocal(){
        return localStorage;
    }

    setLocal(page) {
        localStorage.setItem("page", page);
        console.log(localStorage)
    }
}




