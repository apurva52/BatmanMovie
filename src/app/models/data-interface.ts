export interface batManMovies {

  Response:string;
  totalResults:string;
  Search:movieListEntry[]
}

export interface movieListEntry{
Poster:string;
Title:string;
Type:string;
Year:string;
imdbID:string;
}
