import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb20.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/users', userData).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + '/login', userData).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/movies/:MovieID', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + '/users/' + user, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

 getUserFavMovie(movieList: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const response = this.http.get(apiUrl + '/users/' + username + '/FavoriteMovies/' + movieList,  {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const response = this.http.post(apiUrl + '/users/' + username + '/FavoriteMovies/' + movieID ,{}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(userData:any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const response = this.http.put(apiUrl + '/users/' + username, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    const response = this.http.delete(apiUrl + '/users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteMovie( MovieID: string): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + '/users/' + user + '/FavoriteMovies/' + MovieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // Non-typed response extraction
  private extractResponseData(response: Response|Object): any {
    const body = response;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}