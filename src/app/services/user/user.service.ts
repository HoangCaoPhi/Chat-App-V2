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

  private dataUrl       = 'https://localhost:44378/api/users';
  private dataUrlFromId = 'https://localhost:44378/api/users';
  /**
   *  Lấy ra tất cả thông tin từ server
   */
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl).pipe(retry(3),catchError(this.handleError));
  }
  /**
   * Lấy thông tin của người dùng theo id
   * @param id id của user
   */
  getUserFromId(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrlFromId +'/' + id).pipe(retry(3),catchError(this.handleError));
  }
  // Xử lý lỗi
  handleError(handleError: any): import("rxjs").OperatorFunction<unknown, User[]> {
    throw new Error("Method not implemented.");
  }
}
