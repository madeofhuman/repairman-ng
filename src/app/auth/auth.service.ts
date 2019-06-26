import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserResponse } from '../shared/models';
import { environment } from '../../environments/environment';

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

  /**
   * Register function
   * @param user - stringified user object
   * @returns a registered user as an observable object
   */
  registerUser(user: string): Observable<UserResponse> {
    return this.http.post<any>(this.registrationRoute, user, httpOptions).pipe(
      tap(_ => this.log('User was successfully registered')),
      catchError(this.handleError<UserResponse>('Register User'))
    );
  }

  /**
   * Log in function
   * @param user - stringified user object
   * @returns a logged id user object as an observable
   */
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

  /**
   * Check user login status
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

    /**
   * Check user admin status
   * @returns boolean
   */
  isAdmin(): boolean {
    return !!JSON.parse(localStorage.getItem('auth_user')).admin;
  }

  /**
   * Log custom messages to the console
   * @param message - custom message
   * @returns void
   */
  log(message: string): void {
    console.log(message);
  }
}
