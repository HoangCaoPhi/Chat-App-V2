import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIdTranferService {

  constructor() { }
  private _getUser: BehaviorSubject<string> = new BehaviorSubject<string>('');
  getUser$: Observable<string> = this._getUser.asObservable();

  setUser(userTranfer: any) {
    this._getUser.next(userTranfer);
  }
}
