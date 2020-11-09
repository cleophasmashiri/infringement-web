import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

export class ActivityIds {
  driverNominations = 'driverNominations';
  reviewDriverInfrigement = 'reviewDriverInfrigement';
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private engineRestUrl = `${SERVER_API_URL}services/infringementapi/api/engine-rest/`;

  constructor(private http: HttpClient) {}

  getInstanceCountsByActivityId(activityId: string): Observable<number> {
    const endpoint = this.engineRestUrl + 'process-instance/count' + (activityId ? '?activityIdIn=' + activityId : '');
    return this.http.get<any>(endpoint, httpOptions).pipe(
      tap(form => this.log(`fetched counts`)),
      catchError(this.handleError('getCounts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    // console.log(message);
  }
}
