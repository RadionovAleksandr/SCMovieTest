import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return  this.http.get<void>('https://api.themoviedb.org/3/movie/'+id+'?api_key=07223f1ae4f3155a8e7eadc55a5431eb')
      // .subscribe(moviesRespponce => {
      //     this.movies = moviesRespponce.results;
      //     console.log(' this.movies1 ', this.movies);
      // });
  }
}
