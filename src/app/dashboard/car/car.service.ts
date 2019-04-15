import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car, Quote } from '../../shared/models';
import { environment } from '../../../environments/environment';

const APIEndPoint = environment.APIEndPoint;

/**
 * Get header information before each request
 * @returns a new set of HTTP Headers
 */
const httpOptions = () => {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('auth_token')
    })
  };
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carRoute = APIEndPoint + 'cars';

  constructor(private http: HttpClient) { }

  /**
   * Get all the cars that belong to a user
   * @returns an observable array of a uses car(s)
   */
  getCars() {
    return this.http.get<Car[]>(this.carRoute, httpOptions()).pipe(
      tap(_ => this.log('Car successfully retrieved!')),
      catchError(this.handleError<Car[]>('Get user cars', []))
    );
  }

  /**
   * Add a new car to a users collection
   * @param carObject - new car object
   * @returns the new car object as an observable
   */
  addCar(carObject: string): Observable<Car> {
    return this.http.post<Car>(this.carRoute, carObject, httpOptions()).pipe(
      tap(_ => this.log('Car was successfully added')),
      catchError(this.handleError<Car>('Add user car'))
    );
  }

  /**
   * Edit a users car
   * @param carId - car id
   * @param carObject - stingified car object
   * @returns the edited car as an observable
   */
  editCar(carId: number, carObject: string): Observable<Car> {
    return this.http.put<Car>(`${this.carRoute}/${carId}`, carObject, httpOptions()).pipe(
      tap(_ => this.log('Your car has been updated')),
      catchError(this.handleError<Car>('Update user car'))
    );
  }

  /**
   * Remove a user car
   * @param selectedCar - car object for deletion
   * @returns a deleted car as an observable
   */
  removeCar(selectedCar: Car): Observable<Car> {
    return this.http.delete<Car>(`${this.carRoute}/${selectedCar.id}`, httpOptions()).pipe(
      tap(_ => this.log('Car was successfully deleted')),
      catchError(this.handleError<Car>('Delete user car'))
    );
  }

  /**
   * Add a new quote on a users car
   * @param selectedQuote - New quote information
   * @param carId - car Id
   * @returns a newly added quotes as an observable
   */
  addQuote(selectedQuote: string, carId: number): Observable<Quote> {
    return this.http.post<Quote>(`${this.carRoute}/${carId}/quotes`, selectedQuote, httpOptions()).pipe(
      tap(_ => this.log('Quote was successfully added')),
      catchError(this.handleError<Quote>('Add quote'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to the console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}.`);

      // Let the app keep running by returning an empty array
      return of(result as T);
    };
  }

  /**
   * Log information to the user console
   * @param message - log message
   * @returns void
   */
  log(message: string): void {
    console.log(message);
  }
}
