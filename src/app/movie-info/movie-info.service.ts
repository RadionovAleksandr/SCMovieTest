import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MovieSimiral {
    results: void[];
    total_results: number;
    
}
@Injectable({
    providedIn: 'root'
})

// movieDetails[]
// export interface ResponceMovieDetails {
//   results: any[];
// }


export class MovieInfoService {

    constructor(private http: HttpClient) { }


    getMoviesDetails(id: number): Observable<void> {
        return this.http.get<void>('https://api.themoviedb.org/3/movie/' + id + '?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }

    getMoviesSimilar(movieID: number):Observable<MovieSimiral> {
        return this.http.get<MovieSimiral>('https://api.themoviedb.org/3/movie/' + movieID + '/similar?api_key=07223f1ae4f3155a8e7eadc55a5431eb');
    }
}
