import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
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
    tagline: string;
    homepage: string;
}

export interface ResponseMovie {
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface ResponseMovieResult {
    movies: Movie[];
    totalResults: number;
}

export interface Genre {
    id: number;
    name: string;
}
export interface ResponseGenre {
    genres: Genre[];
}

const API_KEY = '07223f1ae4f3155a8e7eadc55a5431eb';
const API_URL = 'https://api.themoviedb.org/3';
@Injectable({
    providedIn: 'root'
})

export class MovieService {
    genres: Genre[] = [];

    constructor(private http: HttpClient) {
        this.getGenre()
            .subscribe(res => {
                console.log(res);
                this.genres = res.genres;
            });
    }

    getMovies(page = 1): Observable<ResponseMovieResult> {
        console.log(page)
        return this.http.get<ResponseMovie>
            (`${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`)
            .pipe(map(res => {
                return {
                    totalResults: res.total_results,
                    movies: res.results.map(movie => {
                        movie.genres = movie.genre_ids.map(id => this.genres.find(g => g.id === id));
                        return movie;
                    })
                };
            }));
    }

    getBookmarks(): Observable<Movie[]> {
        const moviesBookmarks = this.getBookmarksFromStorage();
        const request = moviesBookmarks.map(id => {
            return this.http.get<Movie>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
        });
        return forkJoin(request) as Observable<Movie[]>;
    }

    getGenre(): Observable<ResponseGenre> {
        return this.http.get<ResponseGenre>(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
    }
    getSearchMovie(search: string): Observable<Movie[]> {
        console.log('STRAT getSearchMovie ');
        return this.http.get<ResponseMovie>
            (`${API_URL}/search/movie?api_key=${API_KEY}&query=${search}`)
            .pipe(map(res => {
                return res.results.map(movie => {
                    movie.genres = movie.genre_ids.map(id => this.genres.find(g => g.id === id));
                    return movie;
                });
            }));
    }

    // this method save object movie and save propherty id object movie
    addBookmark(movie) {
        const moviesBookmarks = this.getBookmarksFromStorage();
        if (moviesBookmarks.includes(movie.id) === false) {
            moviesBookmarks.push(movie.id);
            localStorage.setItem('bookmarks', JSON.stringify(moviesBookmarks));
        }
    }

    removeBookmark(movie) {
        const moviesBookmarks = this.getBookmarksFromStorage().filter(item => item !== movie.id);
        localStorage.setItem('bookmarks', JSON.stringify(moviesBookmarks));
    }

    getMovie(id: number): Observable<Movie> {
        return this.http.get<Movie>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
    }

    getSimilar(movieID: number): Observable<Movie[]> {
        return this.http.get<ResponseMovie>(`${API_URL}/movie/${movieID}/similar?api_key=${API_KEY}`)
            .pipe(map(res => {
                return res.results.map(movie => {
                    movie.genres = movie.genre_ids.map(id => this.genres.find(g => g.id === id));
                    return movie;
                });
            }));
    }
    private getBookmarksFromStorage() {
        let moviesBookmarks;
        try {
            moviesBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        } catch (error) {
            moviesBookmarks = [];
        }
        return moviesBookmarks;
    }

    inBookmarks(id: number): boolean {
        return this.getBookmarksFromStorage().includes(id);
    }
}




