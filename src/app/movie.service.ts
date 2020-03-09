import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs'

export interface Movie {
    popularity: number,
    vote_count: number,
    video?: boolean,
    poster_path: string,
    id: number,
    adult?: false,
    backdrop_path: string,
    original_language?: string,
    original_title?: string,
    genre_ids: [number],
    title: string,
    vote_average: number,
    overview: string,
    release_date: void,  // hz object date ?
    genres: [string],
}

export interface ResponceMovieNow {
    results: Movie[]
}

export interface Genre {
    id: number,
    name: string
}
export interface ResponceGenre {
    genres: Genre[]
}
@Injectable({
    providedIn: 'root'
})

export class MovieService implements OnInit {
    movies: Movie[];

    constructor(private http: HttpClient) { }

    getMovies(): Observable<ResponceMovieNow> {
        return this.http.get<ResponceMovieNow>('https://api.themoviedb.org/3/movie/now_playing?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    getGenre(): Observable<ResponceGenre> {
        return this.http.get<ResponceGenre>('https://api.themoviedb.org/3/genre/movie/list?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    ngOnInit() {
        console.log(' movies.service work ')
    }

}


