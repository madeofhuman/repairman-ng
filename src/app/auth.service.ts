import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserResponse } from './shared/models';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const APIEndpoint = environment.APIEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrationRoute = APIEndpoint + 'signup';
  private loginRoute = APIEndpoint + 'auth/login';

  constructor(private http: HttpClient) { }

  registerUser(user: string): Observable<UserResponse> {
    return this.http.post<any>(this.registrationRoute, user, httpOptions).pipe(
      tap(_ => this.log('User was successfully registered')),
      catchError(this.handleError<UserResponse>('Register User'))
    );
  }

  loginUser(user: string): Observable<UserResponse> {
    return this.http.post<any>(this.loginRoute, user, httpOptions).pipe(
      tap(_ => this.log('User was successfully signed in')),
      catchError(this.handleError<UserResponse>('Login User'))
    );
  }

  /**
   * Handle Http operation that failed
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}.`);
      return of(result as T);
    };
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  log(message: string): void {
    console.log(message);
  }
}
