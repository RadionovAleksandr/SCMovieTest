import { Component, OnInit } from '@angular/core';

import { MovieInfoService } from './movie-info.service';
import { observable } from 'rxjs';
import { Movie } from '../movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  id: number;
  movie: Movie;
  constructor(private movieInfoService: MovieInfoService) { }

  ngOnInit(): void {
    // this.movieInfoService.getMoviesDetails(this.id)
    //   .subscribe(movie => {
    //     console.log(movie)
    //     this.movie = movie
      // })
  }
}
