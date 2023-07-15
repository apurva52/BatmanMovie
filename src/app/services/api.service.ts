import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { batManMovies } from '../models/data-interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  batmanMovieUrl = 'https://www.omdbapi.com/?s=Batman&apikey=b45f3dce';

  getBatmanMovieList() {
    let dataUrl: string = `${this.batmanMovieUrl}`
    return this.http.get<batManMovies>(dataUrl).pipe(catchError(this.handleError))
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error:${error.message}`
    }
    else {
      errorMessage = `Status: ${error.status} \n Message:${error.message}`;
    }
    return throwError(errorMessage);
  }
}
