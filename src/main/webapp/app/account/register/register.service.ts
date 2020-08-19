import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IUser } from 'app/core/user/user.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  userRegistered: Subject<string> = new Subject();

  getRegisteredUserSub(): Observable<string> {
    return this.userRegistered.asObservable();
  }

  constructor(private http: HttpClient) {}

  raiseRegistered(email: string): void {
    this.userRegistered.next(email);
  }

  save(account: IUser): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }
}
