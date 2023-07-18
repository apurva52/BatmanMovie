import { Component, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { movieListEntry, batManMovies } from './models/data-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  public movieList: movieListEntry[] = null;
  @ViewChild('btn1') btn1: ElementRef; 
  copyData: movieListEntry[] = [];
  search: string;
  constructor(private apiservice: ApiService) {
    this.fetchMovieList();
    
  }
  ngAfterViewInit(){
    this.btn1.nativeElement.style.backgroundColor = '#164971'
    this.btn1.nativeElement.style.color = 'white'
  }
  fetchMovieList() {
    this.apiservice.getBatmanMovieList().subscribe((res: batManMovies) => {
      this.apiservice.getMovieDetails(res.Search).subscribe((dt: movieListEntry[]) => {
      this.movieList = dt;
      this.copyData = [...this.movieList];
      console.log(res);
      })
    });
  }

  Yearwisemovie(dateval: string, btn: HTMLElement, btnlist: HTMLElement[])
  {
    this.removeEffect(btnlist)
    btn.style.backgroundColor ="#164971"
     btn.style.color = "white"
    this.movieList.map(dt => {
      if (dt.Year.includes('–'))
      {
        dt.Year = dt.Year.split('–')[1]
      }
     return dt;
  })

    switch (dateval){
      case 'All':
        this.movieList = this.copyData;
        break;
      case '1980':
        this.movieList = this.copyData.filter(res => Number(res.Year) > 1980 && Number(res.Year)  <= 1990)
        break;
      case '1990':
        this.movieList = this.copyData.filter(res => Number(res.Year) > 1990 && Number(res.Year) <= 2000);
        break;
      case '2000':
        this.movieList = this.copyData.filter(res => Number(res.Year) > 2000 && Number(res.Year) <= 2010);
        break;
      case '2010':
        this.movieList = this.copyData.filter(res => Number(res.Year) > 2010 && Number(res.Year) <= 2020);
        break;
      case '2020':
        this.movieList = this.copyData.filter(res => Number(res.Year) > 2020 );
        break;
    }
  }
  removeEffect(btnlist):void{
    for (const k of btnlist){
      k.style.backgroundColor = '';
      k.style.color = '';
    }

  }
}
