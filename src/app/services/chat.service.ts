import { Injectable } from '@angular/core';

import { Chat } from '../models/chat';
import { Data } from './../data';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { User } from '@app/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private dataUrl = 'https://localhost:44378/api/users';

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl).pipe(retry(3),catchError(this.handleError));
  }
  
  handleError(handleError: any): import("rxjs").OperatorFunction<unknown, User[]> {
    throw new Error("Method not implemented.");
  }

  getUserId(id: string | string) {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      // tap(selectedUser => console.log(`selected user = ${JSON.stringify(selectedUser)}`)),
      catchError(error => of(new User()))
    );
  }
  
}
