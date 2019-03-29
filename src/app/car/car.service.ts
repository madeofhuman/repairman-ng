import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Car, Quote } from '../shared/models';
import { tap, catchError } from 'rxjs/operators';

const APIEndPoint = environment.APIEndPoint;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('auth_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carRoute = APIEndPoint + 'cars';

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<Car[]>(this.carRoute, httpOptions).pipe(
      tap(_ => this.log('Car successfully retrieved!')),
      catchError(this.handleError<Car[]>('Get user cars', []))
    );
  }

  addCar(carObject: string): Observable<Car> {
    return this.http.post<Car>(this.carRoute, carObject, httpOptions).pipe(
      tap(_ => this.log('Car was successfully added')),
      catchError(this.handleError<Car>('Add user car'))
    );
  }


  removeCar(selectedCar: Car): Observable<Car> {
    return this.http.delete<Car>(`${this.carRoute}/${selectedCar.id}`, httpOptions).pipe(
      tap(_ => this.log('Car was successfully deleted')),
      catchError(this.handleError<Car>('Delete user car'))
    );
  }

  addQuote(selectedQuote: string, carId: number): Observable<Quote> {
    return this.http.post<Quote>(`${this.carRoute}/${carId}/quotes`, selectedQuote, httpOptions).pipe(
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

  log(message: string): void {
    console.log(message);
  }
}
