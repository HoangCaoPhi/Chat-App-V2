import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private dataUrl = 'https://localhost:44378/api/users';

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl).pipe(retry(3),catchError(this.handleError));
  }
  
  handleError(handleError: any): import("rxjs").OperatorFunction<unknown, User[]> {
    throw new Error("Method not implemented.");
  }
}
