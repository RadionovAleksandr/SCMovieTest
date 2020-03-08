import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../movie.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: Movie[], search: string = ''):Movie[] {
    if(!search.trim()) {
      return movies
    }
    return movies.filter((movie) => {
      return movie.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
