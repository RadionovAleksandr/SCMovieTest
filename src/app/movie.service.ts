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
    release_date: void  // hz object date ?
}

export interface ResponceMovieNow {
    results: Movie[]
}
@Injectable({
    providedIn: 'root'
})

export class MovieService implements OnInit {
    movies: Movie[];

    constructor(private http: HttpClient) {}

    getMovies(): Observable<ResponceMovieNow> {
      return  this.http.get<ResponceMovieNow>('https://api.themoviedb.org/3/movie/now_playing?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
        // .subscribe(moviesRespponce => {
        //     this.movies = moviesRespponce.results;
        //     console.log(' this.movies1 ', this.movies);
        // });
    }

    ngOnInit() {
        console.log(' movies.service work ')
    }

}


