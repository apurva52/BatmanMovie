import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { movieListEntry, batManMovies } from './models/data-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public movieList: movieListEntry[] = [];
  copyData: movieListEntry[] = [];
  search: string;
  constructor(private apiservice: ApiService) {
    this.fetchMovieList();
  }
  fetchMovieList() {
    this.apiservice.getBatmanMovieList().subscribe((res: batManMovies) => {
      this.movieList = res.Search;
      this.copyData = [...this.movieList];
      console.log(res);
    });
  }

  Keyup(): void {
    console.log("errer");
    this.movieList = this.copyData.filter(res => {
      if (res.Year.toLowerCase().includes(this.search.toLowerCase().slice(0)))
      {
        return true;
      }
    });
  }
}
