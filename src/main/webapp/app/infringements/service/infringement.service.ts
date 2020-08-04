import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfringementService {
  private engineRestUrl = '/engine-rest/';

  constructor(private http: HttpClient) {}

  getInfringements() {
    const endpoint = `${this.engineRestUrl}infringements`;
    return this.http.get<any>(endpoint).pipe(
      tap(infringements => this.log('infringements')),
      catchError(this.handleError('getInfringements', []))
    );
  }

  getDrivers() {
    const endpoint = `${this.engineRestUrl}drivers`;
    return this.http.get<any>(endpoint).pipe(
      tap(infringements => this.log('drivers')),
      catchError(this.handleError('get drivers', []))
    );
  }

  getVehicles() {
    const endpoint = `${this.engineRestUrl}vehicles`;
    return this.http.get<any>(endpoint).pipe(
      tap(infringements => this.log('vehicles')),
      catchError(this.handleError('get vehicles', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
