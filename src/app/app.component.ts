import { Component } from '@angular/core';
import { AppService } from '../services/api.service';
import { batManMovies, movieListEntry } from './models/data-interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  public movieList :movieListEntry[] = []
  copy_data: movieListEntry[] = [];
  search: string | null = null;
  constructor(private apiservice:AppService){
   this.fetchMovieList()
  }
  fetchMovieList()
  {
    this.apiservice.getBatmanMovieList().subscribe((res:batManMovies)=>{
      this.movieList = res.Search;
      this.copy_data = [...this.movieList]
    console.log(res)
    } )
  }

  Keyup() :void{
    console.log("errer");
    this.movieList = this.copy_data.filter(res => {
      if (res.Year.includes(this.search.charAt(0).toUpperCase() + this.search.slice(1)))
        return true
      else if (res.Year.includes(this.search.charAt(0).toLocaleLowerCase() + this.search.slice(1)))
        return true
      else if (res.Year.includes(this.search)) {
        return res.Year.includes(this.search)
      }
    })
  }
  name = 'Angular 6';
}
