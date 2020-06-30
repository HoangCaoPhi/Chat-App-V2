import { Injectable } from '@angular/core';

import { Chat } from '../_models/chat';
import { Data } from './../data';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  getInfo(): Observable<any[]> {
    return of(Data);
  }

  getChat(id: number | string) {
    return this.getInfo().pipe(
      map(chat => chat.find(chat => chat.id === +id))
    );
  }
  
}
