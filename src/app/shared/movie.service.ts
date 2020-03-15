import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Movie {
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: false;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    title: string;
    vote_average: number;
    overview: string;
    release_date: void;  // hz object date ?
    genre_ids: number[];
    genres?: Genre[];
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

const API_KEY = '07223f1ae4f3155a8e7eadc55a5431eb';
const API_URL = 'https://api.themoviedb.org/3';
@Injectable({
    providedIn: 'root'
})

export class MovieService {
    movies: Movie[];
    genres: Genre[] = [];
    movieBookmarks: Movie[] = [];
    movieBookmarksId: number[] = [];
    arrId;

    constructor(private http: HttpClient) {
        this.getGenre()
            .subscribe(res => {
                console.log(res);
                this.genres = res.genres;
            });
    }

    getMovies(page = 1): Observable<Movie[]> {
        return this.http.get<ResponceMovieNow>
            (`${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`)
            .pipe(map(res => {
                return res.results.map(movie => {
                    movie.genres = movie.genre_ids.map(id => this.genres.find(g => g.id === id));
                    return movie;
                });
            }));
    }

    getBookmarks(id): Observable<Movie> {
        return this.http.get<Movie>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
    }

    getGenre(): Observable<ResponceGenre> {
        return this.http.get<ResponceGenre>(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
    }

    getSearchMovie(search: string): Observable<Movie[]> {
        return this.http.get<ResponceMovieNow>
            (`${API_URL}/search/movie?api_key=${API_KEY}&query=${search}`)
            .pipe(map(res => {
                return res.results.map(movie => {
                    movie.genres = movie.genre_ids.map(id => this.genres.find(g => g.id === id));
                    return movie;
                });
            }));
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

    getMoviesDetails(id: number): Observable<void> {
        return this.http.get<void>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
    }

    getMoviesSimilar(movieID: number): Observable<MovieSimiral> {
        return this.http.get<MovieSimiral>(`${API_URL}/movie/${movieID}/similar?api_key=${API_KEY}`);
    }
}




