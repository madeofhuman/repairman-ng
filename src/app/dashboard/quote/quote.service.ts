import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Quote, Comment } from '../../shared/models';
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
export class QuoteService {
  private adminRoutes = {
    allQuotes: APIEndPoint + 'admin/quotes'
  };

  constructor(private http: HttpClient) { }

  /**
   * Get all the quotes that exist on the system (admin)
   * @returns an observable array of all quotes
   */
  getAllQuotes() {
    return this.http.get<Quote[]>(this.adminRoutes.allQuotes, httpOptions()).pipe(
      tap(_ => this.log('Quotes sucessfully retrieved!')),
      catchError(this.handleError<Quote[]>('Get all quotes', []))
    );
  }

  /**
   * Get a single quote with the supplied id
   * @param quote_id quote id
   */
  getQuote(quote_id: number) {
    return this.http.get<Quote>(`${this.adminRoutes.allQuotes}/${quote_id}`, httpOptions()).pipe(
      tap(_ => this.log('Quote succesfully retrieved')),
      catchError(this.handleError<Quote>('Get quote failed'))
    );
  }

  /**
   * Add a new quote on a users car
   * @param selectedQuote - New quote information
   * @param carId - car Id
   * @returns a newly added quotes as an observable
   */
  addQuoteComment(quoteId: number, comment: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.adminRoutes.allQuotes}/${quoteId}/comments`, comment, httpOptions()).pipe(
      tap(_ => this.log('Comment was successfully added')),
      catchError(this.handleError<Comment>('Add quote comment failed'))
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
